const { register, login,getMe } = require("../Controllers/users.controller");
const { protect } = require("../middelware/authMiddelware");


const router=require("express").Router();

router.post("/",register)
router.post("/login",login)
router.get("/me",protect,getMe)

module.exports =router