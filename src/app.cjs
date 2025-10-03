const express= require('express');

const app=express();

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

const connectdb=require("./config/database");   // connecting to the database folder 

const User=require("./models/user");

app.post("/signup",async(req,res)=>{
   

 const user= new User({
    firstname: "Pratyush",
    lastname: "Kumar",
    emaidId:"Pratyush@gmail.com",
    password:"Pratyush@123"
});
 try{
   await user.save();
 res.send("user added successfully ");
 }catch(err){
  res.status(500).send("Something went wrong");
}
});
connectdb().then(()=>{
  console.log("Database connection is succesfully established ");
  app.listen(7777,()=>{
    console.log("The server is successfully running on port 7777");
});
}).catch(err=>{
   console.log("Database cannot be connected ");
});

