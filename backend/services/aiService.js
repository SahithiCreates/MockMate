const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateQuestion(profile, resumeText,conversation, isFirst = false) {
  const prompt = `
You are an expert FAANG interviewer.

Role: ${profile.role}
Company: ${profile.company}
Experience: ${profile.experienceYears}

Conversation:
${conversation.map((c, i) => `Q${i + 1}: ${c.question}\nA${i + 1}: ${c.answer}`).join("\n")}

resume text :${resumeText}

RULES:
- Ask EXACTLY ONE question
- Mix interview types naturally:
  - 60% technical (DSA, OS, DBMS, OOP, system design)
  -20% based on resume text
  - 20% behavioral (teamwork, challenges, experience)
- Do NOT ask multiple questions
-Adapt questions based of user answers
- No explanations
- No follow-ups
- Output ONLY the question
`;

  const model = genAI.getGenerativeModel({
    model:  "gemini-3.1-flash-lite",
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  return result.response.text().trim();
}

module.exports = generateQuestion;