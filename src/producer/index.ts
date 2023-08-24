import express from 'express'
import { sendMessage } from './sendMessage'
import { fireAndForget } from './fireAndForget'

const log = (message: string) => {
  console.log(`[${new Date().toISOString()}, producer] ${message}`)
}

const app = express()

app.get('/:name', async (req, res) => {
  const name = req.params.name
  log('got root')
  fireAndForget(() => sendMessage(name))
  res.send(`Sending message: ${name}`)
})

const port = 4000
app.listen(port)
