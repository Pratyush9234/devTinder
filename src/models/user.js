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
        index: true,
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
        enum:["male","female","other"],
        default:"other",
        
    },
    photourl:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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