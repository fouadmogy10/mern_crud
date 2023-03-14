const mongoose = require("mongoose");
const Schema = mongoose.Schema;




// define the Schema (the structure of the article)
const userSchema = new Schema({

  name: {
    type:String,
    required:[true,'please add a name']
  },
  email: {
    type:String,
    required:[true,'please add a email'],
    unique:true
  },
  password: {
    type:String,
    required:[true,'please add a password'],
  },
  isAdmin:{
    type:Boolean,
    required:true,
    default:false
  }
  

},{
    timestamps:true
});
module.exports=mongoose.model("user",userSchema)
