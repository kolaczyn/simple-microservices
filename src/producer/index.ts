import express from 'express'
import cors from 'cors'
import { sendMessage } from './sendMessage'
import { fireAndForget } from './fireAndForget'

const app = express()

export let welcomeMessage = 'NOTHING YET'

app.use(express.static('src/producer/public'))
app.options('*', cors()) // include before other routes
app.use(express.json())

app.get('/welcome-message', (req, res) => {
  res.send({
    message: welcomeMessage,
  })
})

app.post('/welcome-message', async (req, res) => {
  const message = req.body.message
  welcomeMessage = message
  fireAndForget(() => sendMessage(message))
  res.send(`Sending message: ${message}`)
})

const port = 4000
app.listen(port)
