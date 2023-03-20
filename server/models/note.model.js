const mongoose = require("mongoose");
const Schema = mongoose.Schema;




// define the Schema (the structure of the article)
const noteSchema = new Schema({

  user: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User"
  },
  ticket: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "Ticket"
  },
  isStaff: {
    type:Boolean,
    default :false
  },
  text: {
    type:String,
    required:[true,'please add some text '],
  },
  staffId:{
    type:String,
    
  }
  

},{
    timestamps:true
});
module.exports=mongoose.model("Note",noteSchema)
