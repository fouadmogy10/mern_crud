const express =require("express");
const colors =require("colors")
const { errorHandeler } = require("./middelware/errorHandler");
const dotenv=require("dotenv").config();
const app =express()
const connectDB =require("./config")
const userRouter=require("./routes/users")
const PORT = process.env.PORT
//Connect to database

connectDB();

// express middleware handling the body parsing 
app.use(express.json());

// express middleware handling the form parsing
app.use(express.urlencoded({extended: false}));


app.use("/api/users",userRouter)
app.use("/api/users/login",userRouter)

// error handler

app.use(errorHandeler)

app.listen(PORT,()=>{
    console.log(`conected successfully ON PORT ${PORT}`);
})