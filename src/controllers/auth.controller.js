const userModel = require('../models/auth_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

 async function registerController(req, res){
    const {userName, password} = req.body

    const isuser = await userModel.findOne({
        userName
    })
    if(isuser){
        return res.status(409).json({
            message:"userName already exist..."
        })
    }

    const user = await userModel.create({
        userName,
         password: await bcrypt.hash(password, 10)
        })

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
    res.cookie('token', token)

    res.status(201).json({
        message:"User register Successfully...",
        user
    })
 }

 async function loginController(req, res){
    const {userName, password} = req.body

    const user = await userModel.findOne({
        userName,
    })

    if(!user){
        return res.status(400).json({
            message:"userName not found..."
        })
    }

    const ispassword = await bcrypt.compare(password, user.password)

    if(!ispassword){
        return res.status(400).json({
            message:"Invalid Password..."
        })
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(200).json({
        message:"User loged successfully...",
        user:{
            userName: user.userName,
            id: user._id
        }
    })
 }

 module.exports = {
    registerController,
    loginController
 }