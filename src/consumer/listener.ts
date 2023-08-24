import amqplib from 'amqplib'

const AMQP_URL = 'amqp://localhost:5673'

export const listOfReceivedMessages: string[] = []

const processMessage = async (msg: amqplib.ConsumeMessage | null) => {
  if (!msg) {
    return
  }

  console.log('processing message')
  listOfReceivedMessages.push(msg.content.toString())
}

export const listener = async () => {
  const connection = await amqplib.connect(AMQP_URL, 'heartbeat=60')
  const channel = await connection.createChannel()
  channel.prefetch(10)
  const queue = 'user.sign_up_email'
  process.once('SIGINT', async () => {
    console.log('got sigint, closing connection')
    await channel.close()
    await connection.close()
    process.exit(0)
  })

  await channel.assertQueue(queue, { durable: true })
  await channel.consume(
    queue,
    async msg => {
      console.log('processing messages')
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
  console.log(' [*] Waiting for messages. To exit press CTRL+C')
}
