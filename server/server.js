import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises
const data = require('./data')

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const read = () => {
  return readFile(`${__dirname}/logs.json`).then((info) => JSON.parse(info))
}
const write = (filename, content) => {
  return writeFile(`${__dirname}/${filename}.json`, JSON.stringify(content, 1, 2))
}
server.get('/api/v1/catalog', (req, res) => {
  res.json(data)
})

server.get('/api/v1/rates', async (req, res) => {
  const { data: rates } = await axios('https://api.exchangeratesapi.io/latest?symbols=USD,CAD')
  res.json(rates.rates)
})

server.post('/api/v1/logs', async (req, res) => {
  const logs = await read()
  let updateLogs =  []
  console.log(logs)
  // eslint-disable-next-line no-shadow
  const data = `0${+new Date().getDate()}.0${+new Date().getMonth()} in ${+new Date().getHours()}:${+new Date().getMinutes()}`
  switch (req.body.type) {
    case 'ADD_TO_CART':
      updateLogs = [...logs, { time: data , event: `added new product ${req.body.id}` }]
      break
    case 'REMOVE_FROM_CART':
      updateLogs = [...logs, { time: data, event: 'product deleted' }]
      break
    case 'SET_BASE':
      updateLogs = [...logs, { time: data, event: `volute changed to ${req.body.base}` }]
      break
    default:
      updateLogs = [...logs]
  }
  await write('logs', updateLogs)
  res.json('hello')
})

server.get('/api/v1/logs', async (req, res) => {
  const logs = await read()
  res.json(logs)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Boilerplate'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
