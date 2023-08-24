import express from 'express'
import { listener, welcomeMessage } from './listener'
import cors from 'cors'

listener()

const app = express()

app.use(express.static('src/consumer/public'))
app.options('*', cors()) // include before other routes

app.get('/message', (req, res) => {
  res.send({
    message: welcomeMessage,
  })
})

const port = 3000
app.listen(port)
