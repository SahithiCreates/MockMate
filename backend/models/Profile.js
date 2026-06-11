const mongoose=require("mongoose");
const profileSchema=mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true
    },
    role:{
        type:String,
    },
    experienceYears:{
        type:Number,
    },
    company:{
        type:String,
    },
    resumeLink:{
        type:String,
        default:""
    }
})

const Profile=mongoose.model("Profile",profileSchema);
module.exports=Profile;


    