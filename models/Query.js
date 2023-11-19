const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({

    item_details: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"ITEM"
    },
    message: {
        type: String,
        trim: true
    }, 
    claimed_by:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"USER"
    },
    claimed_from:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"USER"
    }
})

module.exports = mongoose.model("QUERY", querySchema);