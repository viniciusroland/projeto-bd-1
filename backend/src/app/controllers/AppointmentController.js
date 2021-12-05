const Appointment = require('../models/Appointment')
const User = require('../models/User')
const File = require('../models/File')
const Notification = require('../schemas/Notification')
const Mail = require('../../lib/Mail')

const CancellationMail = require('../jobs/CancellationMail')
const Queue = require('../../lib/Queue')

const yup = require('yup')

const { startOfHour, parseISO, isBefore, format, subHours } = require('date-fns')
const pt = require('date-fns/locale/pt')

class AppointmentController {
  async store(req, res) {
    const schema = yup.object().shape({
      provider_id : yup.number().required(),
      date : yup.date().required()
    })

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error : 'Validation failed!' })
    }

    const { provider_id, date } = req.body

    // checking if user_id == provider_id
    if (provider_id === req.userId) {
      return res.status(401).json({ error : 'User and provider are the same.'})
    }

    // checking is the user is provider
    const isProvider = await User.findOne({ where : { id : provider_id, provider : true }})
    if (!isProvider) {
      return res.status(401).json({ error : 'You can only create appointments with providers'})
    }

    // check is the date is a past date
    const startHour = startOfHour(parseISO(date))
    console.log('startHour', startHour)
    if (isBefore(startHour, new Date())) {
      return res.status(400).json({ error : 'Past dates is not allowed.'})
    }

    // checking the availability of an appointment
    const isNotAvailable = await Appointment.findOne({
      where : {
        provider_id,
        canceled_at : null,
        date : startHour
      }
    })
    if (isNotAvailable) {
      return res.status(400).json({ error : 'Appointment date is not available'})
    }

    const appointment = await Appointment.create({
      user_id : req.userId,
      provider_id,
      date : startHour
    })

    // notify appointment provider
    const user = await User.findByPk(req.userId)
    const formatedDate = format(
      startHour,
      "'dia' dd 'de' MMMM', às' HH:mm'h'",
      { locale : pt }
    )
    console.log('formatedDate', formatedDate)
    await Notification.create({
      content : `Novo agendamento de ${user.name} para o ${formatedDate}`,
      user : provider_id
    })

    return res.json(appointment)
  }
  async index(req, res) {
    const { page = 1 }  = req.query

    const appointments = await Appointment.findAll({
      where : {
        user_id : req.userId,
        canceled_at : null
      },
      order : ['date'],
      attributes : ['id', 'date', 'past', 'cancelable'],
      limit : 20,
      //offset : (page - 1) * 20,
      include : [
        {
          model : User,
          as : 'provider',
          attributes : ['id', 'email', 'name'],
          include : {
            model : File,
            as : 'avatar',
            attributes : ['id', 'path', 'url']
          }
        }
      ]
    })
    return res.json(appointments)

  }
  async show(req, res) {
  }
  async update(req, res) {
  }
  async delete(req, res) {
    const appointmentId = req.params.id

    const appointment = await Appointment.findByPk(appointmentId, {
      include : [
        {
          model : User,
          as : 'provider',
          attributes : ['name', 'email']
        },
        {
          model : User,
          as : 'user',
          attributes : ['name', 'email']
        }
      ]
    })
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({ error : "You don't have permission to cancel this appointment."})
    }

    // checking if the appointment is 2 hours ahead of the time the user try to cancel it
    const dateWithLessHours = subHours(appointment.date, 2)
    
    if (isBefore(dateWithLessHours, new Date())) {
      return res.status(401).json({ error : 'You can not cancel a appointment with less then 2 hours of antecipation'})
    }

    appointment.canceled_at = new Date()
    await appointment.save()

    await Queue.add(CancellationMail.key, {
      appointment
    })

    return res.json(appointment)
  }
}

module.exports = new AppointmentController()
