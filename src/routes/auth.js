const express= require("express");

const authRouter = express.Router();
const {validateSignupData} = require("../utils/validation");
 
 
const User= require("../models/user.js");
const bcrypt = require("bcrypt");

authRouter.post("/signup",async(req,res)=>{ 
   //during signup operation first thing it should happen is Validations of data 
   validateSignupData(req); // validating the signup data
   // Then you should encrypt the password 
   const {password} = req.body;  //extacting the password from the req body
    const hashedPassword = await bcrypt.hash(password,10); // hashing the password using bcrypt
    console.log(hashedPassword);
    req.body.password= hashedPassword; // replacing the password with hashed password
   // and then save the data to the database

   //creating a new instance for the user model
    const user = new User(req.body); // never trust the request body..  // storing the user into the database
  
  try{
   await user.save();
   res.send("user added successfully ");
 }catch(err){
  res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async(req,res)=>{
   try{
    const{emailId,password}= req.body;  // first step is extracting the emailid and pass
    const user= await User.findOne({emailId : emailId}); // findinging the desired from  database
    if(!user){
      throw new Error("User not found with email " + emailId);  // checking is user emailid is available in db
    }
    const ispasswordvalid = await user.validatePassword(password); // validating the password using bcrypt compare method
    
    if(ispasswordvalid){    
      
      // creating a jwt token.... 
      
      const token = await user.getJWT(); // craeting a token using jwt sign method
      console.log(token);
       res.cookie("token",token);     // adding cookie 
      return res.send("Login successfull");           // comaparing the hashed password with your postman testing password 
                                                      // if it matches then login success and if not new err is thrown 
    }
    else{
      throw new Error("Invalid password");
    }
  }
   catch(err){
      res.status(400).send("Something went wrong " + err.message);
   }

});

module.exports = authRouter;