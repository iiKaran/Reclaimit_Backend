
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
require("dotenv").config();
const accountSid = process.env.ACCOUNT_SSID
const authToken = process.env.AUTH_TOKEN
const phone_num = process.env.PHONE_NUM
const client = require('twilio')(accountSid, authToken);
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.SendOtp = async (req, res) => {
    const otp = generateOTP();
    const { contact, sent, recOtp } = req.body;
    if (sent) {
        try {
            console.log(contact, sent, recOtp);
            const found = await OTP.find({ contact:contact }).sort({ createdAt: -1 }).limit(1);
            if ((found.length === 0)) {
                return response.status(400).json({
                    success: false,
                    message: "OTP Not Found"
                })
            }
            else {
                if (found[0].otp == recOtp) {
                    return res.status(200).json({
                        success: true,
                        message: "OTP verified successfully"
                    })
                }
                else
                    return res.status(404).json({
                        success: false,
                        message: "invalid otp"
                    })
            }

        }
        catch (err) {
            res.status(500).json({ error: 'Failed to varify OTP' });
        }
    }
    else {
        try {
            let cd = '';
            if (contact[0] == '+') {
                cd = contact;
            }
            else {
                cd = "+91" + contact;
            }
            const rs = await client.messages.create({
                to: cd,
                from: phone_num,
                body: `Your verification code is: ${otp} message is from RECLAIM_IT. `,
            });
            const created = await OTP.create({ contact, otp });
            console.log(created)
            res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send OTP' });
        }
    }
}
function generateWhatsAppLink(phoneNumber) {
    // Remove any non-numeric characters from the phone number
    
    // const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Generate the WhatsApp link
    const whatsappLink = "https://wa.me/+91"+(phoneNumber);
  
    return whatsappLink;
  }
exports.SignUpMethod = async (req, res) => {
    try {
        const { email, password, name, confirmPassword, contact  } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Enter the details Properly"
            })
        }
        const findUser = await User.findOne({ email });
        if (findUser)
            return res.status(404).json({
                success: false,
                message: "User is already Registered"
            })
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "false detials"
            })
        }
        const gen = generateWhatsAppLink(contact);
        const cryptedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ email, password: cryptedPassword, name , contact, link:gen});

        return res.status(200).json({
            success: true,
            message: "User Registered",
            cryptedPassword
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occured in the server",
            err
        })
    }
}
exports.LoginInMethod = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("i got the requuest")
        console.log("the request is", req.body)

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Enter the details Properly"
            })
        }
        const findUser = await User.findOne({ email: email });
        console.log(findUser);
        if (!findUser)
            return res.status(404).json({
                success: false,
                message: "No User is Registered"
            })
        if (await (bcrypt.compare(password, findUser.password))) {
            require("dotenv").config();
            const payload = {
                email: findUser.email,
                id: findUser._id,
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY);
            console.log(token);
            return res.status(200).json({
                success: true,
                message: "User login",
                token, 
                user:findUser
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Password Incorect"
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occured in the server",
            err
        })
    }
}
exports.loggedIn = async (req, res) => {
    try {
        console.log("loogoj hsdn")
        const { token } = req.body;
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Not found token"
            })
        }
        console.log("here os the ", token);
        require("dotenv").config();
        const user = jwt.decode(token, process.env.SECRET_KEY);
        console.log("the user i", user)
        const points = await User.findById({ _id: user.id }).points;

        return res.status(200).json({
            success: true,
            message: "USER IS LOGGED IN",
            user,
        })
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "error while logged in"
        })
    }
}
// log in 
// sign up 
