const express = require('express');
const profileRouter = express.Router();
const { userauth } = require("../middlewares/auth.cjs");
profileRouter.get("/profile", userauth , async(req,res)=>{
  try{
  const user= req.user; // getting user from req object
  
  res.send(user);}
  catch(err){
    res.status(401).send( err.message);
  }
});

module.exports = profileRouter;