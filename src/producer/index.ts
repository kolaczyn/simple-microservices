import express from 'express'

const log = (message: string) => {
  console.log(`[${new Date().toISOString()}, producer] ${message}`)
}

const app = express()

app.get('/', (req, res) => {
  log('got root')
  res.send('root hit')
})

const port = 4000
app.listen(port)
