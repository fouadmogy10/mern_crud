const mongoose = require("mongoose");
const Schema = mongoose.Schema;




// define the Schema (the structure of the article)
const ticketSchema = new Schema({

  user: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User"
  },
  product: {
    type:String,
    required:[true,'please select a product'],
    enum:["iphone","iMac","iPad"]
  },
  description: {
    type:String,
    required:[true,'please enter a adescription of the issue '],
  },
  status:{
    type:String,
    required:true,
    enum:["new","open","closed"],
    default:"new"
  }
  

},{
    timestamps:true
});
module.exports=mongoose.model("Ticket",ticketSchema)
