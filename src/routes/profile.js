const express = require('express');
const profileRouter = express.Router();
const { userauth } = require("../middlewares/auth.cjs");
const {validateEditprofileData} = require("../utils/validation.js");
const {validatepasswordchange} = require("../utils/validation.js");
const bycrypt = require("bcrypt");
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

profileRouter.patch("/profile/password", userauth, async(req,res)=>{
  try{
    validatepasswordchange(req);
    const loggedInuser = req.user;
    const {oldpassword, newpassword}= req.body;
    const ispasswordvalid = await loggedInuser.validatePassword(oldpassword);
    if(!ispasswordvalid){
      throw new Error("Old password is incorrect");
    }
    const hashednewpassword = await bycrypt.hash(newpassword,10);
    loggedInuser.password = hashednewpassword;
    await loggedInuser.save();
    res.json({message:"Password changed successfully"});
  }
  catch(err){
    res.status(400).send("err "+ err.message);
  }
});

module.exports = profileRouter;