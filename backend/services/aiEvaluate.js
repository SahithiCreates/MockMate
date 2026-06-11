const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

async function aiEvaluate(interview) {
  const prompt = `
You are an expert interviewer.

Role: ${interview.role}
Experience: ${interview.experienceYears}

Resume:
${interview.resumeText}

Interview Conversation:
${JSON.stringify(interview.conversation)}

Evaluate the candidate.

Return ONLY JSON:

{
  "score": 8,
  "feedback": "Detailed feedback"
}
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return JSON.parse(response);
}

module.exports = aiEvaluate;