const yup = require('yup')

const firstSchema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .required('name is required'),
    description: yup
    .string()
    .trim()
    .required('description is required'),
    completed: yup.boolean()
})

const secondSchema = yup.object().shape({
    project_id: yup
    .number()
    .required(),
    description: yup
    .string()
    .max(128, 'cannot be longer than 128 characters')
    .required('description is required'),
    notes: yup
    .string()
    .trim()
    .required('notes are required'),
    completed: yup.boolean()
})

module.exports = {
    firstSchema,
    secondSchema,
}