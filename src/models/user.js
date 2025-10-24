const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        minLength: 4,
    },
    lastname:{
        type: String,
        
    },
    emailId:{
        type: String,
        required : true,
        unique : true,
        index: true,
        lowecase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid" + value);
            }
        }
    },
    password:{
        type: String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Passowrd is not strong enough"+ value)
            }
        }
    },
    age:{
        type: Number,
        min: 19,
        max: 80,
    },
    gender:{
        type: String,
        enum:["male","female","other"],
       
        
    },
    photourl:{
      type: String,
      default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error ("Photo url is invalid " + value);  // these are the validations in schema
        }
      }
    },
    about:{
        type: String,
        default: "Hey there! I am using DevTinder",
    },
    skills:{
        type: [String],
        
    },
},
{
    timestamps: true,
},
   );

const User = mongoose.model("user", userSchema);
module.exports = User;