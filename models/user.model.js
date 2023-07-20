const { Schema, model } = require('mongoose')

const User = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, require: true },
  phoneNumber: { type: String, unique: true },
  avatar: { type: String, default: '' },
  status: { type: Boolean, default: false },
  orderHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})

module.exports = model('User', User)
