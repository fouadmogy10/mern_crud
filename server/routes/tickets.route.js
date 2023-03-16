const { getTicket, createTicket, getSingelTicket, updateTicket, deleteTicket } = require("../Controllers/ticket.controller");
const { protect } = require("../middelware/authMiddelware");


const router=require("express").Router();

router.route("/").get(protect,getTicket).post(protect,createTicket)
router.route("/:id").get(protect,getSingelTicket).put(protect,updateTicket).delete(protect,deleteTicket)


module.exports =router