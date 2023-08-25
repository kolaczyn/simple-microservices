import { knex } from './db'
import { sendMessage } from './sendMessage'

type WelcomeMessageOutbox = {
  id: number
  message: string
  sent: boolean
}

export const startCron = () => {
  setInterval(async () => {
    const selectedRows = await knex('welcome_messages_outbox')
      .select<WelcomeMessageOutbox[]>('*')
      .where({ sent: false })

    selectedRows.forEach(({ message, id }) => {
      console.log('sending message', message)
      sendMessage(message)
      knex('welcome_messages_outbox').where({ id }).update({ sent: true })
    })
  }, 2000)
}
