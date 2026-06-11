const Profile = require("../models/Profile");

const createProfile = async (req, res) => {
  try {
    const file = req.file;
    const { role, experienceYears, company } = req.body;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required"
      });
    }
    const resumeUrl = `/uploads/resumes/${file.filename}`;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }
    let profile = await Profile.findOne({ userId });
    if (profile) {
      profile.role = role;
      profile.experienceYears = experienceYears;
      profile.company = company;
      profile.resumeLink = resumeUrl;
      await profile.save();
    } else {
      profile = await Profile.create({
        userId,
        role,
        experienceYears,
        company,
        resumeLink: resumeUrl
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: profile
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = createProfile ;