import amqplib from 'amqplib'

const AMQP_URL = 'amqp://localhost:5673'

export let welcomeMessage = 'NOTHING YET'

const extractMessage = (msg: amqplib.ConsumeMessage | null) => {
  if (!msg) {
    return null
  }

  const content: unknown = JSON.parse(msg.content.toString())

  if (typeof content === 'object' && content != null && 'name' in content && typeof content.name === 'string') {
    return content.name
  }
  return null
}

const processMessage = async (msg: amqplib.ConsumeMessage | null) => {
  const name = extractMessage(msg)

  if (name) {
    welcomeMessage = name
  }
}

export const listener = async () => {
  const connection = await amqplib.connect(AMQP_URL, 'heartbeat=60')
  const channel = await connection.createChannel()
  await channel.prefetch(10)
  const queue = 'user.sign_up_email'
  process.once('SIGINT', async () => {
    await channel.close()
    await connection.close()
    process.exit(0)
  })

  await channel.assertQueue(queue, { durable: true })
  await channel.consume(
    queue,
    async msg => {
      await processMessage(msg)
      if (msg) {
        await channel.ack(msg)
      }
    },
    {
      noAck: false,
      consumerTag: 'email_consumer',
    }
  )
}
