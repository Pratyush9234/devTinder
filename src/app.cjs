const connectdb = require('./config/database.js');
connectdb();
const express= require('express');
const app=express();

const cookieParser = require('cookie-parser');

//handling the code 

// app.get("/user/:userID/:name/:password",(req,res)=>{
//    console.log(req.params);
//    res.send({firstname:"pratyush",lastname:"Kumar"});
// });

// app.post("/dashboard",(req,res)=>{
//   res.send("Hello im responding from dashboard");
// });

// app.post("/serach",(req,res)=>{
//   res.send({Firstname:"Aayush",lastname:"Kumar"});
// });

// app.use("/route",(req,res)=>{
//   res.send("jai hind jai bharat");
// });

// app.use("/test",(req,res)=>{
//     res.send("Hello from the test");  //request handler
// });

// app.use("/hello",(req,res)=>{
//    res.send("Hello im responding");
// });

// app.use("/dashboard",(req,res)=>{
//   res.send("Hello from the dashboard to the client");
// });
// const {adminauth}=require("./middlewares/auth.cjs");
// const {userauth}=require("./middlewares/auth.cjs");

// app.use("/admin", adminauth,(req,res)=>{
//   res.send("admin is authorized and you can proceed further");
// });

// app.use("/dashboard",(req,res)=>{
//    try{
//      throw new Error("fdhgvhydsc");
//      res.send("data is sent");
     
//    }
//    catch(err){
//     req.statusCode(500).send("something went wrong");
//    }
//    });

// app.get("/user",userauth,(req,res)=>{
//   res.send("Data is  sent");
// });

// app.use("/admin/getAlldata",(req,res)=>{
//    res.send("The admin is authorized and all data is sent ");
// });

// app.use("/admin/DeleteAlldata",(req,res)=>{
//   res.send("Deleted all data");
// });

 
const User= require("./models/user.js");

const {validateSignupData} = require("./utils/validation");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { connect } = require('mongoose');

app.use(express.json());// middleware 

app.use(cookieParser()); // using cookie parser middleware

const { userauth } = require("./middlewares/auth.cjs");



app.get("/profile", userauth , async(req,res)=>{
  try{
  const user= req.user; // getting user from req object
  
  res.send(user);}
  catch(err){
    res.status(401).send( err.message);
  }
});

app.post("/signup",async(req,res)=>{ 
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

app.post("/login", async(req,res)=>{
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

app.post("/sendconnectionrequest", userauth, async(req,res)=>{
   const user = req.user;
    // sending the conncection request
    console.log("Connection request sent");

    res.send(user.firstname + " Sent the connection request ");
});

connectdb().then(()=>{
  console.log("Database connection is succesfully established ");
  app.listen(7777,()=>{
    console.log("The server is successfully running on port 7777");
});
}).catch(err=>{
   console.log("Database cannot be connected ");
});

