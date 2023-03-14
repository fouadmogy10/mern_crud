const AsyncHandler=require("express-async-handler")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require("../models/users.model")
const register =AsyncHandler(async(req,res,next)=>{
    const{name,email,password}=req.body
    if (!name||!email||!password) {
        res.status(400)
        throw new Error('Please include all field')
    }

    //Find if user exist
    const userExist =await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('user already exist')
    }

    //hash password
    const salt=await bcrypt.genSalt(10)
    const hashedPass =await bcrypt.hash(password,salt)

    //Create user
    const user =await User.create({
        name,email,password:hashedPass
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
        email:user.email,
        token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.status(200).json({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
})
const login =AsyncHandler(async(req,res,next)=>{
    const{email,password}=req.body
    if (!email||!password) {
        res.status(400)
        throw new Error('Please include all field')
    }
        //Find if user exist
        const user =await User.findOne({email})

        if(user && (await bcrypt.compare(password,user.password))){
            res.status(200).json({
                _id:user._id,
                name:user.name,
            email:user.email,
            token:generateToken(user._id)
            })
        }else{
            res.status(401)
            throw new Error('invalid email or password')
        }
    

})

// @desc get current user
// @route /api/user/me
//@access private
const getMe =AsyncHandler(async(req,res,next)=>{
    const user ={
        id:req.user._id,
        name:req.user.name,
        email:req.user.email,
    }
    res.status(200).json(user)
})
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
module.exports={
    register,login,getMe
}