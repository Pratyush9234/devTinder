const express = require("express");
const userRouter = express.Router();
const { userauth } = require("../middlewares/auth.cjs");
const connectionRequests = require("../models/Connectionrequest.js");
const { connection, default: mongoose } = require("mongoose");


userRouter.get("/user/requests/recieved", userauth, async (req, res)=>{
  try{
    const loggedInuser =req.user;
    const connectionrequest = await connectionRequests.find({
        touserId: loggedInuser._id,
        status : "intrested",
    }).populate("fromuserId","firstname lastname age gender about");
    
    res.json({
        message: "Connection requests fetched successfully",
        data: connectionrequest,
    });
  }
  catch(err){
    res.status(400).send("err "+ err.message);
  }
});



userRouter.get("/user/connections",userauth,async(req,res)=>{
  try{
      const loggeInUser =req.user;
      const connections = await connectionRequests.find({
          $or:[
              {fromuserId: loggeInUser._id, status: "accepted"},
              {touserId: loggeInUser._id, status: "accepted"},
          ],
      }).populate("fromuserId touserId","firstname lastname age gender about").populate("touserId","firstname lastname age gender about");

      const data = connections.map((row)=>{
      if(row.fromuserId._id.toString() == loggeInUser._id.toString()){
          return row.touserId;
      }
      else{
          return row.fromuserId;
      }
      });
    
      res.json({
          message: "Connections fetched successfully",
          data,
      });
  }
  catch(err){
    res.status(400).send("err "+err.message);
  }
})


userRouter.get("/user/feed",userauth,async(req,res)=>{
  try{
      const loggedInUser = req.user;
      const connectionrequest = await connectionRequests.find({
        $or:[
          {fromUserId :(loggedInUser._id)},
          {toUserId: (loggedInUser._id)},
        ]
      });
      res.send(connectionrequest);
  }
  catch(err){
    res.status(400).send("err "+err.message);
  }
});
module.exports= userRouter;