const Interview = require("../models/Interview");

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json(interviews);

  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getHistory;