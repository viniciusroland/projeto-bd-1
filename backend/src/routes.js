const { Router } = require('express')
const multer = require('multer')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const FileController = require('./app/controllers/FileController')
const ProviderController = require('./app/controllers/ProviderController')
const AppointmentController = require('./app/controllers/AppointmentController')
const ScheduleController = require('./app/controllers/ScheduleController')
const NotificationController = require('./app/controllers/NotificationController')
const AvailableController = require('./app/controllers/AvailableController')

const authMiddleware = require('./app/middlewares/auth')
const multerConfig = require('./config/multer')
const upload = multer(multerConfig)

const routes = new Router()

routes.get('/', (_, res) => {
  return res.json({ message : 'Olá GoStack', method : 'GET' })
})

routes.post('/users', UserController.store) // create user
routes.get('/users', UserController.index) // list users

routes.post('/sessions', SessionController.store) // create session

routes.use(authMiddleware) // using jwt middleware in all the above routes

routes.put('/users', UserController.update) // update user
routes.post('/files', upload.single('file'), FileController.store) // upload file (avatar photo)

routes.get('/providers', ProviderController.index) // list all provider users
routes.get('/providers/:providerId/available', AvailableController.index) // list all available time

routes.post('/appointments', AppointmentController.store) // create appointment
routes.get('/appointments', AppointmentController.index) // list appointments
routes.delete('/appointments/:id', AppointmentController.delete) // delete appointment

routes.get('/schedule', ScheduleController.index) // get the provider schedule

routes.get('/notifications', NotificationController.index) // get all the notifications
routes.put('/notifications/:id', NotificationController.update) // update (read) notification

module.exports = routes