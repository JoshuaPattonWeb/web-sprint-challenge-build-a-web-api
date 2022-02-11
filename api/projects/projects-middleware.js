// add middlewares here related to projects
const Projects = require('./projects-model')
const { firstSchema } = require('../Schemas/schema')

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`)
    next()
}

function errorCheck(err, req, res, next) {
    res.status(err.status || 500).json ({
        message: err.message
    })
}

async function idChecker(req, res, next) {
    try {
        const project = await Projects.get(req.params.id || req.body.project_id)
        if(!project) {
            next({
                status: 404,
                message: "project was not found"
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function validate(req, res, next) {
    try {
        const valid = await firstSchema.validate(req.body, {
            strict: false,
            stripUnknown: true
        })
        req.body = valid
        next()
    } catch (err) {
        next({
            status: 400,
            message: err.message
        })
    }
}

module.exports = {
    logger,
    errorCheck,
    idChecker,
    validate,
}