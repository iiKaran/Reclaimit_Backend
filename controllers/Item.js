const User = require("../models/User"); 
const Item = require("../models/Item"); 
const {uploadImagetoCloudinary} = require("../utilities/uploadImage");


exports.getAllItems = async(req, res)=>{
    try{
         
       const allItems = await Item.find({}); 
       return res.status(200).json({
        success:true, 
        message:"all Items fetched", 
        data:allItems
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

exports.getItem = async(req, res)=>{
    try{

       const {item_id}= req.body ; 
       const getItem = await Query.findById(item_id);
       
       if(!getItem)
       return res.status(404).json({
        success:false, 
        message:"no such Item found", 
       })


       return res.status(200).json({
        success:true, 
        message:"Item fetched", 
        data:getItem
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

exports.PostNewItem = async (req, res) =>{
    try{
         const {name , description , image_url,location,feature, user_id} = req.body ;

         const postedItem = Item.create({name , description, image_url,location,feature, user_id});

         return res.status(200).json({
            success:true , 
            message:"Successfully Posted Item", 
            data: postedItem
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
exports.addPicture = async (req, res) => {
    try {
        console.log("got rew")
      const itemPic = req.files.itemPic; 
      const image = await uploadImagetoCloudinary(
        itemPic,
        "StudyNotion",
      )
      console.log(image)
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: image.secure_url,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  };
  
// all items 
// get one of posted items
// post new items 


