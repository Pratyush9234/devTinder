const express = require('express');
const requestRouter = express.Router();
const { userauth } = require("../middlewares/auth.cjs");
const Connectionrequest = require("../models/Connectionrequest.js");
const User = require("../models/user.js");

requestRouter.post("/request/send/:status/:touserId", userauth, async(req,res)=>{
   try{
     const fromuserId = req.user._id;
     const touserId = req.params.touserId;  
    const status = req.params.status;

    const allowedstatus = ["ignored","intrested"];
    if(!allowedstatus.includes(status)){
        return res.status(400).json({
            message: "Invalid status",
        });
    }

const touser = await User.findById(touserId);
    if(!touser){
        return res.status(404).json({
            message: "Target user not found",
        });
    }
    const existingconnectionrequest = await Connectionrequest.findOne({
        $or:[
            {fromuserId, touserId},
            {fromuserId: touserId, touserId: fromuserId}
        ],
    });
    if(existingconnectionrequest){
        return res.status(400).json({
            message: "Connection request already sent",
        });
    }
    const connectionRequest = new Connectionrequest({
      fromuserId: fromuserId,
      touserId: touserId,
      status: status,
    });
    const data=await connectionRequest.save();
    res.json({
        message: `${req.user.firstname} sent connection request to ${touser.firstname} with status: ${status}`,
        data,
    });
   }
   catch(err){
    res.status(400).send("err "+ err.message);
   }
});
module.exports = requestRouter;