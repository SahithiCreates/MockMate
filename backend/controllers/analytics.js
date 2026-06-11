const Interview = require("../models/Interview");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const interviews = await Interview.find({ userId })
      .sort({ createdAt: 1 }); 

    if (!interviews.length) {
      return res.json({
        totalInterviews: 0,
        avgScore: 0,
        bestScore: 0,
        trend: [],
        recent: [],
      });
    }

    
    const totalInterviews = interviews.length;

    
    const scores = interviews.map(i => i.score || 0);

    const avgScore =
      scores.reduce((a, b) => a + b, 0) / totalInterviews;

    const bestScore = Math.max(...scores);

    
    const recent = interviews
      .slice(-5)
      .reverse()
      .map(i => ({
        id: i._id,
        role: i.role,
        score: i.score,
        feedback: i.feedback,
        date: i.createdAt,
      }));

    return res.json({
      totalInterviews,
      avgScore: Number(avgScore.toFixed(2)),
      bestScore,
      recent,
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Dashboard error",
    });
  }
};

module.exports = getDashboard;