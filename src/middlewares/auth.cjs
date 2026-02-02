 const jwt = require('jsonwebtoken');
 const User= require("../models/user.js");

const userauth= async (req,res,next)=>{
  // Read the tokens from rq cookies 
  
  try{const {token}= req.cookies; 
  if(!token){
    throw new Error("No token found");
  }

  //validate/verify the token 
  const decodeObj = await jwt.verify(token,"DEV@Pratyush790");

  const {_id} = decodeObj; // getting user id from decoded object

  const user = await User.findById(_id); // fetching user from db
  if(!user){
    throw new Error("User not found");
  }
  req.user = user; // attaching user to req object
  next();
 
}
catch(err){
  res.status(401).send("Unauthorized User"+ err.message);

};
}
module.exports ={
  
  userauth,
};

