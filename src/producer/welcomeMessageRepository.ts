import { IWelcomeMessageRepository, WelcomeMessage } from './types'
import { knex } from './db'

const TABLE_WELCOME_MESSAGES = 'welcome_messages'
const TABLE_WELCOME_MESSAGES_OUTBOX = 'welcome_messages_outbox'

export const welcomeMessageRepository: IWelcomeMessageRepository = {
  get: async () => {
    const found = await knex(TABLE_WELCOME_MESSAGES).select<WelcomeMessage[]>('*').first()

    if (!found) {
      return null
    }

    return {
      message: found.message,
      id: found.id,
    }
  },

  update: async (message: string) => {
    await knex(TABLE_WELCOME_MESSAGES).del()
    await knex(TABLE_WELCOME_MESSAGES).insert({ message })
    await knex(TABLE_WELCOME_MESSAGES_OUTBOX).insert({ message })
  },
}
