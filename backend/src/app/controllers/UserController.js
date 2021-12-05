const User = require('../models/User')
const File = require('../models/File')

// yup is a lib to validate data:
//  check the email,
//  check the requirement
//  check the min length 
//  etc
const yup = require('yup')

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name : yup.string().required(),
      email : yup.string().email().required(),
      password : yup.string().min(6).required()
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error : 'Validation failed.'})
    }

    const userExists = await User.findOne({ where : { email : req.body.email }})

    if (userExists) {
      return res.status(400).json({ error : 'Email already been used!'})
    }

    const data = req.body
    const { id, name, email, provider } = await User.create(data)

    return res.json({
      id,
      name,
      email,
      provider
    })
  }
  async index(req, res) {
    console.log("aqui")
    const users = await User.findAll({
      attributes : ['id', 'email', 'name', 'provider'],
      include : [
        {
          model : File,
          as : 'avatar',
          attributes : ['id', 'path', 'url']
        }
      ]
    })
    return res.json(users)
  }
  async show(req, res) {

  }
  async delete(req, res) {

  }
  async update(req, res) {
    const schema = yup.object().shape({
      name : yup.string(),
      email : yup.string().required(),
      oldPassword : yup.string().min(6),
      password : yup.string().min(6).when('oldPassword', (oldPassword, field) => 
        oldPassword ? field.required() : field
      ),
      confirmPassword : yup.string().when('password', (password, field) => 
        password ? field.required().oneOf([yup.ref('password')]) : field
      )
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error : 'Validation failed.'})
    }

    const { email, oldPassword } = req.body

    const user = await User.findByPk(req.userId)

    if (email !== user.email) {
      const userExists = await User.findOne({ where : { email }})
      if (userExists) {
        return res.status(400).json({ error : 'Email already been used!'})
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error : 'Wrong password.'})
    }

    await user.update(req.body)
    const { id, name, avatar } = await User.findByPk(req.userId, {
      include : [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url']
        }
      ]
    })

    return res.json({
      id,
      name,
      email,
      avatar
    })
  }

}

module.exports = new UserController()
