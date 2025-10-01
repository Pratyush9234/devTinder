const express= require('express');

const app=express();

//handling the code 

app.use("/test",(req,res)=>{
    res.send("Hello from the test");  //request handler
});

app.use("/hello",(req,res)=>{
   res.send("Hello im responding");
});

app.use("/dashboard",(req,res)=>{
  res.send("Hello from the dashboard to the client");
});

app.listen(7777,()=>{
    console.log("The server is successfully running on port 7777");
});