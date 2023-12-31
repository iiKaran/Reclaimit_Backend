const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }, 
    contact:{
        type: String,
        trim: true
    },
    password:{
        type: String,
        trim: true
    }, 
    link:{
         type: String,
         trim: true
    }
})
module.exports = mongoose.model("USER", userSchema);