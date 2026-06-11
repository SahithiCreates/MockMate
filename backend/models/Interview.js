const mongoose=require("mongoose");
const interviewSchema=mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role:{
        type:String,
        required:true
    },
    experienceYears:{
        type:Number,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    conversation: [
      {
        question: String,
        answer: String,
      },
    ],
    resumeText:{
      type:String,
      default:""
    },
    score: {
      type: Number,
      default: null,
    },
    feedback: {
      type: String,
      default: "",
    },
},{timestamps:true})

const Interview=mongoose.model("Interview",interviewSchema);
module.exports=Interview;