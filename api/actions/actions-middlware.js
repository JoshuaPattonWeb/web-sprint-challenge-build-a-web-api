// add middlewares here related to actions
const Actions = require('./actions-model')
const {
    firstSchema,
    secondSchema,
} = require('../Schemas/schema')


async function errorCheck(err, req, res, next) {
    res.status(err.status || 500).json ({
        message: err.message
    })
}

async function actionIdCheck(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            next({
                status: 404,
                message: "id was not found"
            })
        } else {
            req.actionById = action
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function completedCheck(req, res, next) {
    try {
        const validate = await secondSchema.validate(req.body, {
            strict: false,
            stripUnknown: true,
        })
        req.body = validate
        next()
    } catch (err) {
        next({
            status: 400,
            message: err.message
        })
    }
}

module.exports = {
    actionIdCheck,
    completedCheck,
    errorCheck,
}