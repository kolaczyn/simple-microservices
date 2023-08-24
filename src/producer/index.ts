import express from 'express'
import cors from 'cors'
import { sendMessage } from './sendMessage'
import { fireAndForget } from './fireAndForget'
import { knex } from './db'

const app = express()

app.use(express.static('src/producer/public'))
app.options('*', cors()) // include before other routes
app.use(express.json())

type WelcomeMessage = {
  id: number
  message: string
}

app.get('/welcome-message', async (req, res) => {
  const selectedRows = await knex('welcome_messages').select<WelcomeMessage[]>('*').first()

  if (!selectedRows) {
    return res.sendStatus(404)
  }

  res.send({
    message: selectedRows.message,
    id: selectedRows.id,
  })
})

app.post('/welcome-message', async (req, res) => {
  const message = req.body.message
  fireAndForget(() => sendMessage(message))

  await knex('welcome_messages').del()
  await knex('welcome_messages').insert({ message })

  res.send(`Sending message: ${message}`)
})

const port = 4000
app.listen(port)
