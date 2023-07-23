require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const mongoose = require('mongoose')
const router = require('./router/index.js')
const authRouter = require('./router/authRoutes.js')
const path = require('path')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'avatars')))
app.use(
  fileupload({
    createParentPath: true,
  })
)

// app.use(express.urlencoded({ extended: true }))

app.use('/api', router)
app.use('/auth', authRouter)

app.listen(port, async () => {
  await mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('work')
})
