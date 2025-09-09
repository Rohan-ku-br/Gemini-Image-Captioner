const express = require('express')
const cookieParser = require('cookie-parser')
const router = require('./routes/auth_router')
const postRouter = require('./routes/post.router')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', router)
app.use('/api/posts', postRouter)

module.exports = app