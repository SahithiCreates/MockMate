const fs = require("fs");
const pdf = require("pdf-parse");

async function getResumeText(resumePath) {
  try {
    const dataBuffer = fs.readFileSync(`.${resumePath}`);

    const pdfData = await pdf(dataBuffer);

    return pdfData.text.trim();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = getResumeText;