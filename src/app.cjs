const connectdb = require('./config/database.js');
connectdb();
const express= require('express');
const app=express();

const cookieParser = require('cookie-parser');






const jwt = require("jsonwebtoken");
const { connect } = require('mongoose');

app.use(express.json());// middleware 

app.use(cookieParser()); // using cookie parser middleware




const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/requests.js");
const { default: userrouter } = require('./routes/user.js');
const userRouter = require('./routes/user.js');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

//finding document using get api
app.get("/user",async(req,res)=>{
  const email= req.body.emailId;
    try{
     const user = await User.find({emailId:email});
     if(user.length==0){
      res.status(404).send("User not found");
     }
     res.send(user);
    }
    catch{
      res.status(500).send("Something went wrong ");
    }
});

// Feed API - GET/feed -get all the user from the database
app.get("/feed",async(req,res)=>{
    
    try{
      const user= await User.find({});
      if(user.length==0){
        res.status(404).send("User not found");
      }
      res.send(user);
    }
    catch(err){
      res.status(404).send("Something went wrong");
    }
});
//Delete api - deleteing documents from database 
app.delete("/delete",async(req,res)=>{
  const userId= req.body.userId;
  try{
    const user=await User.findByIdAndDelete(userId);
    
    res.send("user deleted successfully");
  }
  catch(err){
    res.sendStatus(401).send("Cant delete the user id something went wrong");
  }
});

//Update api - updating the data of the user

app.patch("/update/:userId",async(req,res)=>{
    const userId= req.params?.userId; //will find the user id from here
    const data=req.body; //this will fetch the whole body u written in postman to update
    
    
    try{

      const UPDATEALLOWED=["firstname","lastname","password","age","skills","photourl","about"];

    const isUpdateAllowed = Object.keys(data).every((keys)=> UPDATEALLOWED.includes(keys));

    if(!isUpdateAllowed){
      return res.status(400).send("Invalid updates");
    }

       const user=await User.findByIdAndUpdate({_id: userId},data,{
        returnDocument: 'after',
        runValidators: true,
       });
       console.log(user);
       res.send("user updated succesfully");
    }
    catch(err)
{
    res.status(400).send("something went wrong" + err.message);
}});



connectdb().then(()=>{
  console.log("Database connection is succesfully established ");
  app.listen(7777,()=>{
    console.log("The server is successfully running on port 7777");
});
}).catch(err=>{
   console.log("Database cannot be connected ");
});

