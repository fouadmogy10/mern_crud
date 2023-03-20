const {  getNote, CreateNote} = require("../Controllers/note.controller");
const { protect } = require("../middelware/authMiddelware");


const router=require("express").Router({mergeParams:true});

router.route("/").get(protect,getNote).post(protect,CreateNote)


module.exports =router