const jwt =require("jsonwebtoken")
const express =require("express");
const AsyncHandler=require("express-async-handler")
const User=require("../models/users.model")


const protect =AsyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token=req.headers.authorization.split(' ')[1]
            const decoded =jwt.verify(token,process.env.JWT_SECRET)
            req.user =await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized')
    }
})
module.exports={
    protect
}