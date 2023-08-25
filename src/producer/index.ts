import express from 'express'
import cors from 'cors'
import { startCron } from './cron'
import { welcomeMessageRepository } from './welcomeMessageRepository'

const app = express()

app.use(express.static('src/producer/public'))
app.options('*', cors()) // include before other routes
app.use(express.json())

app.get('/welcome-message', async (_, res) => {
  const result = await welcomeMessageRepository.get()
  if (!result) {
    return res.sendStatus(404)
  }

  res.send({
    message: result.message,
    id: result.id,
  })
})

app.post('/welcome-message', async (req, res) => {
  const message = req.body.message
  if (!message) {
    return res.sendStatus(400)
  }

  await welcomeMessageRepository.update(message)

  res.send(`Sending message: ${message}`)
})

const port = 4000

app.listen(port)
startCron()
