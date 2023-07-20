const { Schema, model } = require('mongoose')

const avatarModel = new Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  path: String,
})

module.exports = module('Avatar', avatarModel)
