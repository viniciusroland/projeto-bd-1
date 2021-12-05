require('dotenv/config')
const express = require('express')
const cors = require('cors')
require('express-async-errors')
const routes = require('./routes')
const { resolve } = require('path')
const Youch = require('youch')

const Sentry = require('@sentry/node')
const sentryConfig = require('./config/sentry')
const database = require('./database')

class App {
  constructor() {
    this.server = express()

    Sentry.init(sentryConfig)

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler())
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')))

  }

  routes() {
    this.server.use(routes)
    this.server.use(Sentry.Handlers.errorHandler())
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if ("development" === 'development') {
        const errors = await new Youch(err, req).toJSON()
        return res.status(500).json(errors)
      } else {
        return res.status(500).json({ error : 'Internal server error' })
      }

    })

  }
}

module.exports = new App().server
