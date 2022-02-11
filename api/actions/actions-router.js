// Write your "actions" router here!
const express = require('express')
const { pathToFileURL } = require('url')
const Actions = require('./actions-model')
const { actionIdCheck, completedCheck, errorCheck } = require('./actions-middlware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const action = await Actions.get()
                res.status(200).json(action)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', actionIdCheck, async (req, res, next) => {
    res.status(200).json(req.actionById)
})

router.post('/', completedCheck, actionIdCheck, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', completedCheck, actionIdCheck, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', actionIdCheck, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.status(200).json({
            message: 'The selected action has been deleted'
        })
    } catch (err) {
        next(err)
    }
})

router.use(errorCheck)

module.exports = router