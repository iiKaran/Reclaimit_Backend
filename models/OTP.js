const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        trim: true
    },
    contact:{
        type: String,
        trim: true
    }, 
    createdAt: { type: Date, default: Date.now, expires: '5m' }
})

module.exports = mongoose.model("OTP", otpSchema);