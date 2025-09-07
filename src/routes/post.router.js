const express = require('express')
const authMiddleware = require('../middleware/auth.Middleware')
const createPostController = require('../controllers/post.controller')
const router = express.Router()
const multer = require('multer')


router.post('/', authMiddleware, createPostController)



module.exports = router