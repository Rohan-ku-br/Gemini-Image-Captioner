const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const createPostController = require('../controllers/post.controller')
const postRouter = express.Router()
const multer = require('multer')


const upload = multer({storage : multer.memoryStorage() })

postRouter.post('/', authMiddleware, upload.single('image') ,createPostController)



module.exports = postRouter