const mongoose= require("mongoose");

const connectdb= async()=>{
    mongoose.connect("mongodb+srv://gdscpratyushai_db_user:Pratyush1@namastenode.wee2ov5.mongodb.net/devTinder");

     
};
                  
// connecting to database 
module.exports=connectdb;
