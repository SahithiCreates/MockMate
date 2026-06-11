const Profile = require("../models/Profile");

const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const file = req.file;
    const { role, experienceYears, company } = req.body;

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }
    let resumeUrl = profile.resumeLink;
    if (file) {
      resumeUrl = `/uploads/resumes/${file.filename}`;
    }

    profile.role = role;
    profile.experienceYears = experienceYears;
    profile.company = company;
    profile.resumeLink = resumeUrl;

    await profile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
      data: profile
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = updateProfile ;