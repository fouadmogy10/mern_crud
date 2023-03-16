const User = require("../models/users.model")
const Ticket = require("../models/tecket.model")
const AsyncHandler = require("express-async-handler")



// @desc post ticket
// @route /api/tickets/
//@access private
const createTicket = AsyncHandler(async(req, res, next) => {
    const {

        product,
        description,
    } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('please fill all field')
    }
    //Create user
    const ticket =await Ticket.create({
        product,
        description,user:req.user.id,
        status:"new"
    })


    res.status(201).json({
        message: ticket
    })
})
// @desc get ticket
// @route /api/tickets/
// @access public

const getTicket = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }

    const tickets = await Ticket.find({ user: req.user.id })
    res.status(200).json({
        message: tickets 
    })
})

// @desc get ticket
// @route /api/tickets/:id
// @access public

const getSingelTicket = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }

    const ticket = await Ticket.findById({ _id: req.params.id })
    
    if (!ticket) {
        res.status(404)
        throw new Error('ticket not found')
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error(' not authorized')
    }
    res.status(200).json({
        message: ticket 
    })
})

// @desc put ticket
// @route /api/tickets/:id
// @access public
const updateTicket = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }


    const upateTicket = await Ticket.findByIdAndUpdate( req.params.id ,req.body,{new:true})
    
   
    res.status(200).json({
        message: upateTicket 
    })
})
const deleteTicket = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }


    const deleteTicket = await Ticket.findByIdAndDelete( req.params.id ,req.body,{new:true})
    
   
    res.status(200).json({
        message: deleteTicket 
    })
})


module.exports = {
    getTicket,
    createTicket,getSingelTicket,updateTicket,deleteTicket
}

