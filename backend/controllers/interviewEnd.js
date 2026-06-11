const Interview = require("../models/Interview");
const aiEvaluate  = require("../services/aiEvaluate");

const endInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    interview.status = "completed";

    const result=await aiEvaluate(interview);
    interview.score = result.score;
    interview.feedback = result.feedback;
    await interview.save();

    return res.status(200).json({
      message: "Interview completed successfully",
      score: result.score,
      feedback: result.feedback
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = endInterview;