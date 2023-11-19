const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }, 
    image_url:{
          type:String , 
          trim:true 
    },
    location:{
          type:String , 
          trim:true 
    }, 
    date:{
          type:Date, 
          trim:true , 
          default:Date.now()
    },
    feature:{
        type:String , 
          trim:true 
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"USER"
    }
})

module.exports = mongoose.model("ITEM", itemSchema);