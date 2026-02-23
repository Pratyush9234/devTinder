const mongoose= require("mongoose");

const connectionrequestschema = new mongoose.Schema({
    fromuserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    touserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        enum:{
            values:["ignored","accepted","rejected","intrested"],
            message: `{VALUE} is not supported status`,
        },
        default: "intrested",
        },
    },
    {timestamps: true}
);

connectionrequestschema.index({fromuserId: 1, touserId: 1});

    connectionrequestschema.pre("save",function(next){
    const connectionrequest = this;
    if(connectionrequest.fromuserId.equals(connectionrequest.touserId)){
        throw new Error("Cannot send connection request to yourself");
    }
    next();
   });

    const Connectionrequest = mongoose.model("Connectionrequest", connectionrequestschema);

    module.exports = Connectionrequest;

