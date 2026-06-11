const mongoose=require("mongoose");

mongoose.connect(process.env.mongoURL)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=>{
    console.log("mongo error",err);
});

module.exports=mongoose;