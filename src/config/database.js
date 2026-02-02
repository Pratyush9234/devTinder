const mongoose= require("mongoose");

const connectdb= async()=>{
    mongoose.connect("mongodb+srv://pratyush93041kumarsinha_db_user:Pratyush123@silenthut.qdpmkwm.mongodb.net/");

     
};
                  
// connecting to database 
module.exports=connectdb;
