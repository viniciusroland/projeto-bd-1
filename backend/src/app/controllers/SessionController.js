const jwt = require('jsonwebtoken')
const User = require('../models/User')
const File = require('../models/File')

// yup is a lib to validate data:
//  check the email,
//  check the requirement
//  check the min length 
//  etc
const yup = require('yup')

// configurations to set the jwt encryption
const authConfig = require('../../config/auth')

class SessionController {
  async store(req, res) {

    const schema = yup.object().shape({
      email : yup.string().email().required(),
      password : yup.string().required(),
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error : 'Validation failed.'})
    }
    const { email, password } = req.body

    const user = await User.findOne({
      where : { email },
      include : [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url']
        }
      ]
    })

    if (!user) {
      return res.status(401).json({ error : 'User not found.'})
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error : 'Wrong password!'})
    }

    const { id, name, avatar, provider } = user
    return res.json({
      user : {
        id,
        name,
        email,
        avatar,
        provider

      },
      // just passing the id to the token (its possible to pass any object)
      token : jwt.sign({ id }, authConfig.secret, {
        expiresIn : authConfig.expiresIn
      })
    })

  }
}

module.exports = new SessionController()
