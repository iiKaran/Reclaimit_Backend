const mongoose = require("mongoose");

require("dotenv").config();
const dbConnect = async ()=>{

    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
      console.log("db is connected");
    }).catch((err)=>{
        console.log("Error while connnecting to db",err);
    })
}
module.exports = dbConnect;