import express from 'express'
import cors from 'cors'
import { sendMessage } from './sendMessage'
import { fireAndForget } from './fireAndForget'

const app = express()

export let welcomeMessage = 'NOTHING YET'

app.use(express.static('src/producer/public'))
app.options('*', cors()) // include before other routes

app.get('/message', (req, res) => {
  res.send({
    message: welcomeMessage,
  })
})

// not semantic rest, what whatever :p
app.get('/send-message/:name', async (req, res) => {
  const name = req.params.name
  welcomeMessage = name
  fireAndForget(() => sendMessage(name))
  res.send(`Sending message: ${name}`)
})

const port = 4000
app.listen(port)
