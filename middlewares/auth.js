const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 
const User = require("../models/User"); 
// auth middle ware  
exports.auth = async(req,res,next)=>{
   try{
    // extract token 
    console.log(req.header("Authorization"),"header id ")
    const token = req.cookies.token || req.body.token ||req.header("Authorization").replace("Bearer ", ""); 
    // if token is missing 
    if(!token){
     res.status(401).json({
      success: "False", 
      message:"Token is missing"
     })
    }

    // token verify to auntheticate
       try{
        const decode = jwt.verify(token,process.env.JWT_SECRET); 
        console.log(decode); 
        req.user= decode ; 
       }
       catch(err)
       {
        console.log(err); 
        res.status(400).json({
         success: false , 
         message:"Something went wrong"
        })
       }
       next();
   }
   catch(err){
    console.log(err);
    res.status(400).json({
     success: false , 
     message:"Something went wrong"
    })
   }
}