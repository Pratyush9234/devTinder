
const validator = require("validator");

// validating signup data
const validateSignupData=(req)=>{

    const {firstname,lastname,emailId,password,age} = req.body;
    
    if(!firstname || !lastname) {
        throw new Error("Firstname and Lastname are required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error ("Email is invalid " + emailId);
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Password is not strong enough " + password);
    }
};

const validateEditprofileData=(req)=>{

    const allowededitfields = ["firstname","lastname","emailId","password","age","skills","gender"];
    
    const isValidEdit = Object.keys(req.body).every(field => allowededitfields.includes(field));
    return isValidEdit;
}


const validatepasswordchange=(req)=>{
    const {oldpassword, newpassword, confirmpassword} = req.body;

    if(!oldpassword || ! newpassword || !confirmpassword){
        throw new Error("All fields are required");
    }
    else if(newpassword !== confirmpassword){
        throw new Error("New password and confirm password do not match");
    }   
    else if(!validator.isStrongPassword(newpassword)){
        throw new Error("New password is not strong enough " + newpassword);
    }

    else if(oldpassword === newpassword){
        throw new Error("New password cannot be same as old password");
}
}
module.exports={
    validateSignupData,
    validateEditprofileData,
    validatepasswordchange,
};