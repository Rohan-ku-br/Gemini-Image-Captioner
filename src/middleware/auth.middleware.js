const jwt = require('jsonwebtoken')
const userModel = require('../models/auth_model')

async function authMiddleware(req, res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorize access, please login first..."
        })
    }

    try{
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findOne({
        _id:decode.id
    })
    next()
    console.log(decode);
    }catch(err){
        return res.status(401).json({
            message:"not valid token, login First..."
        })
    }
    
}

module.exports = authMiddleware