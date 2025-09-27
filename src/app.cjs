const express= require('express');

const app=express();

//handling the code 

app.use("/test",(req,res)=>{
    res.send("Hello from the test");  //request handler
});

app.use("/hello",(req,res)=>{
   res.send("Hello im responding");
});

app.use((req,res)=>{
  res.send("Hello from the dashboard");
});

app.listen(7777,()=>{
    console.log("The server is successfully running on port 7777");
});