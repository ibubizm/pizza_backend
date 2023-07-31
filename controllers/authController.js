const User = require('../models/user.model')
const Order = require('../models/order.model')
const path = require('path')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthorithationController {
  async registration(req, res) {
    try {
      const { email, password, phoneNumber, name, status = false } = req.body
      let avatar
      let fileName

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist ` })
      }

      if (req.files) {
        avatar = req.files
        fileName = uuid.v4() + '.jpg'
        avatar.mv(path.resolve(__dirname, '..', 'avatars', fileName))
      }

      const hashPassword = await bcrypt.hash(password, 3)

      const user = new User({
        email,
        password: hashPassword,
        name,
        phoneNumber,
        avatar: fileName,
        status,
      })
      const order = new Order({})
      user.orderHistory.push(order)

      await order.save()
      await user.save()

      return res.status(201).json({ message: 'user was created', user })
    } catch (e) {
      console.log(e)
    }
  }

  async login(req, res) {
    const { email, password } = req.body
    const emailLowerCase = email.toLowerCase()

    const candidate = await User.findOne({ email: emailLowerCase })

    if (!candidate) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exist ` })
    }

    const correctPassword = await bcrypt.compare(password, candidate.password)

    if (!correctPassword) {
      return res.status(400).json({ message: `invalid password` })
    }

    const token = jwt.sign({ id: candidate._id }, process.env.JWT_TOKEN, {
      expiresIn: '1h',
    })
    return res.status(200).json({
      message: 'loggedIn',
      token,
      user: candidate,
    })
  }

  async auth(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id })

      const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
        expiresIn: '1h',
      })

      return res.json({ user, token })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new AuthorithationController()
