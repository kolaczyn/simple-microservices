import express from 'express'
import { sendMessage } from './sendMessage'

const log = (message: string) => {
  console.log(`[${new Date().toISOString()}, producer] ${message}`)
}

const app = express()

app.get('/', async (_, res) => {
  log('got root')
  await sendMessage()
  res.send('root hit')
})

const port = 4000
app.listen(port)
