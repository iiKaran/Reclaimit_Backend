const express = require("express"); 

const {LoginInMethod, SignUpMethod,loggedIn} = require("../controllers/Auth"); 

const router = express.Router();


router.post("/signup",SignUpMethod); 
router.post("/login",LoginInMethod);
router.post("/loggedIn",loggedIn);
module.exports = router;
