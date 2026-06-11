const Interview = require("../models/Interview");
const Profile = require("../models/Profile");
const ai = require("../services/aiService");

const nextQuestion = async (req, res) => {
  try {
    const { interviewId, answer } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    const lastIndex = interview.conversation.length - 1;

    if (lastIndex >= 0) {
      interview.conversation[lastIndex].answer = answer;
    }

    const cleanConversation = interview.conversation.filter(
      c => c.answer && c.answer.trim() !== ""
    );

    const profile = {
      role: interview.role,
      company: interview.company,
      experienceYears: interview.experienceYears,
    };

    const question = await ai(profile,interview.resumeText, cleanConversation, false);
    interview.conversation.push({
      question,
      answer: ""
    });

    await interview.save();

    return res.status(200).json({ question });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = nextQuestion;