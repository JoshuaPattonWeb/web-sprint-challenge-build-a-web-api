// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const project = await Projects.get()
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
   const { id } = req.params
    try {
        const project = await Projects.get(id)
    if(!project) {
        res.status(404).json ({
            message: "Project not found"
        })
    } else {
        res.status(200).json(project)
    }
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body)
        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    if(req.body.completed === undefined) {
        res.status(400).json({
            message: "Required field is missing"
        })
    } else {
        try {
            const changedProject = await Projects.update(req.params.id, req.body)
            res.status(200).json(changedProject)
        } catch (err) {
            next(err)
        }
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.status(200).json({
            message: "The selected project has been deleted"
        })
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', async (req, res, next) => {
    try {
        const project = Projects.getProjectActions(req.params.id)
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
})

router.use(errorCheck)

module.exports = router