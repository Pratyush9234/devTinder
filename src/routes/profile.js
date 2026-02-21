const express = require('express');
const profileRouter = express.Router();
const { userauth } = require("../middlewares/auth.cjs");
const {validateEditprofileData} = require("../utils/validation.js");
profileRouter.get("/profile/view", userauth , async(req,res)=>{
  try{
  const user= req.user; // getting user from req object
  
  res.send(user);}
  catch(err){
    res.status(401).send( err.message);
  }
});
profileRouter.patch("/profile/edit", userauth, async (req,res)=>{
   try{
    if(!validateEditprofileData(req)){
      throw console.error("Invalid Edit");
    }
    const loggedInuser =req.user;
    
  Object.keys(req.body).forEach(field =>{
  loggedInuser[field] = req.body[field];
  });
   
  await loggedInuser.save();
    res.json({message:`Profile updated successfully for user ${loggedInuser.firstname} ${loggedInuser.lastname}`,data:loggedInuser});
   }
   catch(err){
    res.status(400).send("err "+err.message);
   }
});

module.exports = profileRouter;