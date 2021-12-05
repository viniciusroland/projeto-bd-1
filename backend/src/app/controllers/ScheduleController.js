const Appointment = require('../models/Appointment')
const User = require('../models/User')
const File = require('../models/File')

const { startOfDay, endOfDay, parseISO } = require('date-fns')
const { Op } = require('sequelize')
class ScheduleController {
  async store(req, resk) {

  }
  async index(req, res) {
    // checking if the user is a provider
    const isProvider = await User.findOne({
      where : {
        id : req.userId,
        provider : true
      }
    })
    if (!isProvider) {
      return res.status(401).json({ error : 'User is not a provider.'})
    }

    const { date } = req.query
    const parsedDate = parseISO(date)

    const appointments = await Appointment.findAll({
      where : {
        provider_id : req.userId,
        canceled_at : null,
        date : {
          [Op.between] : [
            startOfDay(parsedDate),
            endOfDay(parsedDate)
          ]
        },
      },
      order : ['date'],
      attributes : ['id', 'date', 'user_id'],
      include : [
        {
          model : User,
          as : 'user',
          attributes : ['id', 'name', 'email'],
          include : [
            {
              model : File,
              as : 'avatar',
              attributes : ['id', 'name', 'path', 'url']
            }
          ]
        }
      ]
    })

    return res.json(appointments)

  }
  async show(req, res) {

  }
  async delete(req, res) {

  }
  async upgrade(req, res) {

  }
}

module.exports = new ScheduleController()
