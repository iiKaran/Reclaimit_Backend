const express = require('express');
const entryRoutes = require("./routes/entryRoutes");
const otherRoutes = require("./routes/OtherRoutes");
const app = express(); 
const fileUpload = require("express-fileupload");
const cors = require("cors"); 
const cookieParser = require("cookie-parser")
const dbConnect = require("./config/database")
const clouldinaryConnect  = require("./config/cloudinary")
require("dotenv").config(); 
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000", 
   }))
   app.use(express.json());
   app.use(fileUpload({
    useTempFiles:true, 
    tempFileDir:"/tmp"
   }))

clouldinaryConnect();  
dbConnect();

app.use("/routes",entryRoutes); 
app.use("/routes",otherRoutes); 
app.listen(4000,()=>{
    console.log("Server started succesfully"); 
})