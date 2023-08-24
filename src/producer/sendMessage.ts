import amqplib from 'amqplib'

const AMQP_URL = 'amqp://localhost:5673'

const serialize = (msg: unknown) => Buffer.from(JSON.stringify(msg))

export const sendMessage = async (name: string) => {
  const connection = await amqplib.connect(AMQP_URL, 'heartbeat=60')
  const channel = await connection.createChannel()

  const exchange = 'user.signed_up'
  const queue = 'user.sign_up_email'
  const routingKey = 'sign_up_email'

  await channel.assertExchange(exchange, 'direct', { durable: true })
  await channel.assertQueue(queue, { durable: true })
  await channel.bindQueue(queue, exchange, routingKey)

  const msg = { name }

  channel.publish(exchange, routingKey, serialize(msg))
  await channel.close()
  await connection.close()
}
