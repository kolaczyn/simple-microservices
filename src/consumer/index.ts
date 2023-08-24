import express from 'express'
import { listener, listOfReceivedMessages } from './listener'

const log = (message: string) => {
  console.log(`[${new Date().toISOString()}, consumer] ${message}`)
}

listener()

const app = express()

app.get('/', (req, res) => {
  log('got root')
  res.send(`hello from consumer ${listOfReceivedMessages}`)
})

const port = 3000
app.listen(port)
