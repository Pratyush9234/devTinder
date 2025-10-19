const mongoose = require("mongoose");

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
        lowecase : true,
        trim : true,
    },
    password:{
        type: String,
        required : true,
    },
    age:{
        type: Number,
        min: 19,
        max: 80,
    },
    gender:{
        type: String,
        default: "https://stock.adobe.com/search?k=dummy",
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("gender data is invalid");
            }
        },
    },
    photourl:{
      type: String,
    },
    about:{
        type: String,
        default: "Hey there! I am using DevTinder",
    },
    skills:{
        type: [String],
        
    },
});



const User = mongoose.model("user", userSchema);
module.exports = User;