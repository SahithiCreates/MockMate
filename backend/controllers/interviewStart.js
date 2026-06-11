const Interview = require("../models/Interview");
const Profile = require("../models/Profile");
const ai = require("../services/aiService");
const getResumeText=require("../controllers/getResumeText");

const interviewStart = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const resumeLink=profile.resumeLink;
    if(!resumeLink){
      return res.status(404).json({ message: "No resume found" });
    }
    const resumeText=await getResumeText(resumeLink);
    const interview = await Interview.create({
      userId,
      role: profile.role,
      company: profile.company,
      experienceYears: profile.experienceYears,
      conversation: [],
      resumeText:resumeText,
    });

    const firstQuestion = await ai(profile,resumeText, [], true);

    interview.conversation.push({
      question: firstQuestion,
      answer: "",
    });

    await interview.save();

    return res.status(200).json({
      question: firstQuestion,
      interviewId: interview._id,
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = interviewStart;