const express = require("express"); 

const {LoginInMethod, SignUpMethod,loggedIn,SendOtp} = require("../controllers/Auth"); 

const router = express.Router();


router.post("/signup",SignUpMethod); 
router.post("/login",LoginInMethod);
router.post("/loggedIn",loggedIn);
router.post("/sendOtp",SendOtp);
module.exports = router;
