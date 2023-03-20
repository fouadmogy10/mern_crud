const User = require("../models/users.model")
const Ticket = require("../models/tecket.model")
const Note = require("../models/note.model")
const AsyncHandler = require("express-async-handler")



 


// @desc get not for ticket
// @route /api/tickets/:id/note
// @access public

const getNote = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }
    
    const tickets = await Ticket.findById(req.params.id)
    console.log(tickets);
    if (tickets.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not Authorized')
    }

    const notes = await Note.find({ticket:req.params.id})
    res.status(200).json(notes)
})

// @desc Post note for ticket
// @route Create /api/tickets/:id/note
// @access public

const CreateNote = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    console.log(user);
    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }
    
    const tickets = await Ticket.findById(req.params.id)
    console.log(tickets);
    if (tickets.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not Authorized')
    }

    const note = await Note.create({
        text:req.body.text,
        isStaff:false,
        ticket:req.params.id,
        user:req.user.id,
    })
    res.status(200).json(note)
})


module.exports={
    getNote,CreateNote
}