const Profile = require("../models/Profile");

const getProfile=async(req,res)=>{
    try{
        const userId=req.user?.id;
        const profile=await Profile.findOne({ userId });
        if (!profile) {
        return res.status(404).json({
            success: true,
            data: null,
            message: "Profile not created yet"
        });
        }
        return res.status(200).json({
        success: true,
        message: "Profile fetched",
        data: profile
        });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({
        success: false,
        message: err.message
        });
    }
    
}

module.exports=getProfile;