const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')
const { logger } = require('./projects/projects-middleware')


server.use(express.json())

server.use('/api/actions', actionRouter)
server.use('/api/projects', logger, projectRouter)

server.use('*', (req, res, next) => {
    next({
        status: 404,
        message: `${req.method} ${req.originalUrl} was not found!`
    })
})
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
