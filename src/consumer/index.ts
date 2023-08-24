import express from 'express'

const log = (message: string) => {
  console.log(`[${new Date().toISOString()}, consumer] ${message}`)
}

const app = express()

app.get('/', (req, res) => {
  log('got root')
  res.send('hello from consumer')
})

const port = 3000
app.listen(port)
