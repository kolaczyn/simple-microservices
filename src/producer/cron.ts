import { sendMessage } from './sendMessage'
import { welcomeMessageRepository } from './welcomeMessageRepository'

export const startCron = () => {
  setInterval(async () => {
    const results = await welcomeMessageRepository.getOutbox()

    results.forEach(({ message, id }) => {
      console.log('sending message', message)
      sendMessage(message)
      welcomeMessageRepository.markAsSent(id)
    })
  }, 2000)
}
