 const adminauth= (req,res,next)=>{
  console.log("Admin authentication is getting checked ");
  const token="xyz";
  const isAuthorized= token==="xyz";
  if(!isAuthorized){
    res.status(401).send("The admin is unauthorized");
  }
  else{
    next();                                                 // this whole section is the middleware as it prevents
                                                            // from writing the logic again and again 
  }
};

const userauth= (req,res,next)=>{
  console.log("Admin authentication is getting checked ");
  const token="xyz";
  const isAuthorized= token==="xyz";
  if(!isAuthorized){
    res.status(401).send("The admin is unauthorized");
  }
  else{
    next();                                                 
  }
};

module.exports ={
  adminauth,
  userauth,
}
