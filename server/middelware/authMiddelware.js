const jwt =require("jsonwebtoken")
const express =require("express");
const AsyncHandler=require("express-async-handler")
const User=require("../models/users.model")


const protect =AsyncHandler(async(req,res,next)=>{
    let token



    /* {
        let accessToken =  req.header('Authorization').split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err){
                return res.status(401).json({message: "Unauthorized!"});
            }
            User.findOne({_id: decoded._id, "tokens.token":accessToken}, (err, user) => {
                if(!user){
                    res.status(401).json({message: "Unauthorized!"});
                }
                req.user = user
                req.token = accessToken
                next();
            })
        })
     }*/

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token=req.header('Authorization').split(" ")[1]
            const decoded =jwt.verify(token,process.env.JWT_SECRET)
            req.user =await User.findById(decoded.id).select('-password')
            
            next()
        } catch (error) {
            res.status(401)
            
            throw new Error(` سجل دخول ينجم`)
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('سجل دخول ينجم')
    }
})
module.exports={
    protect
}