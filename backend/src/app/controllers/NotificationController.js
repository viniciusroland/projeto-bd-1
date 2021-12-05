const Notification = require('../schemas/Notification')
const User = require('../models/User')

class NotificationController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where : {
        id : req.userId,
        provider : true
      }
    })
    if(!isProvider) {
      return res.status(401).json({ error : 'Only providers can load notifications.' })
    }

    const notifications = await Notification.find({
      user : req.userId,
    }).sort({ createdAt : 'desc' }).limit(20) // sorting in descending order


    return res.json(notifications)
  }

  async update(req, res) {
    const notificationId = req.params.id
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read :  true },
      { new : true}
    )

    return res.json(notification)
  }
}

module.exports = new NotificationController()