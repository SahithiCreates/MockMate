const axios = require("axios");
require("dotenv").config();

async function listModels() {
  const res = await axios.get(
    `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
  );

  res.data.models.forEach((m) => {
    console.log(m.name);
    console.log(m.supportedGenerationMethods);
    console.log("-----");
  });
}

listModels();