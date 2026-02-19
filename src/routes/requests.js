const express = require('express');
const requestRouter = express.Router();
const { userauth } = require("../middlewares/auth.cjs");

requestRouter.post("/sendconnectionrequest", userauth, async(req,res)=>{
   const user = req.user;
    // sending the conncection request
    console.log("Connection request sent");

    res.send(user.firstname + " Sent the connection request ");
});
module.exports = requestRouter;