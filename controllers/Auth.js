
const User =  require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.SignUpMethod = async(req, res)=>{
     
    try{
         const {email , password, name, confirmPassword} = req.body ; 
         
         if(!email)
         {
            return res.status(400).json({
                success:false , 
                message:"Enter the details Properly"
            })
         }

         const findUser = await User.findOne({email}); 
 
         if(findUser)
         return res.status(404).json({
            success:false , 
            message:"User is already Registered"
        })
         if(password !==  confirmPassword)
         {
            return res.status(400).json({
                success:false , 
                message:"false detials"
            })
         }
        const cryptedPassword = await bcrypt.hash(password,10);
        const createdUser = await User.create({email,password:cryptedPassword,name}); 
        
        return res.status(200).json({
            success:true, 
            message:"User Registered", 
            cryptedPassword
        })
    }
    catch(err){
        console.log(err); 
        return res.status(500).json({
            success:false,
            message:"Error occured in the server", 
            err
        })
    }
}


exports.LoginInMethod = async(req, res)=>{
     
    try{
         const {email , password} = req.body ; 
          console.log("i got the requuest")
         console.log("the request is", req.body)

         if(!email)
         {
            return res.status(400).json({
                success:false , 
                message:"Enter the details Properly"
            })
         }

        const findUser = await User.findOne({email:email}); 
        console.log(findUser);
         if(!findUser)
         return res.status(404).json({
            success:false , 
            message:"No User is Registered"
        })
       
        if(await (bcrypt.compare(password, findUser.password))){
            require("dotenv").config();
            const payload = {
                email: findUser.email,
                id: findUser._id,
                
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY);
            console.log(token);
            return res.status(200).json({
                success:true, 
                message:"User login", 
                token
            })
        }

        else{
            return res.status(400).json({
                success:false , 
                message:"Password Incorect"
            })
        }


        
    }
    catch(err){
        console.log(err); 
        return res.status(500).json({
            success:false,
            message:"Error occured in the server", 
            err
        })
    }
}

exports.loggedIn = async(req, res)=>{
    try{
     console.log("loogoj hsdn")
       const{token} = req.body; 
       if(!token){
        return res.status(404).json({
          success:false , 
          message:"Not found token"
        })
      }
        console.log("here os the ",token);
        require("dotenv").config();
        const user = jwt.decode(token,process.env.SECRET_KEY);
         console.log("the user i", user)
         const points = await User.findById({_id:user.id}).points;
    
        return res.status(200).json({
          success:true , 
          message:"USER IS LOGGED IN",
          user, 
        })
      }
  
    catch(err){
      console.log(err); 
      return res.status(500).json({
        success:false , 
        message:"error while logged in"
      })
    }
  }
// log in 
// sign up 
