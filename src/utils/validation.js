
const validator = require("validator");

// validating signup data
const validateSignupData=(req)=>{

    const {firstname,lastname,emailId,password,age} = req.body;
    
    if(!firstname || !lastname) {
        throw new error("Firstname and Lastname are required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error ("Email is invalid " + email);
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

module.exports={
    validateSignupData,
    validateEditprofileData,
};