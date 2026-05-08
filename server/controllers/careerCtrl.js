import { askGemini }
from "../services/geminiService.js";

export const improveResume =
  async (req, res) => {

  try {

    const {
      name,
      skills,
      projects,
      experience,
      year,
      specialization,
      question,
    } = req.body;

    // ======================================
    // CAREER AI CHAT MODE
    // ======================================

    if (question) {

      const chatPrompt = `
You are a career assistant helping BCA students at The NorthCap University.

Student Details:
Year: ${year}
Specialization: ${specialization}
Skills: ${skills}

Student Question:
${question}

Guidelines:
- Give practical career advice
- Focus on placements, internships, projects, resumes, DSA, and tech roadmaps
- Keep responses concise and helpful
- Avoid generic motivational language
- Use markdown formatting where helpful
`;

      const reply = await askGemini(chatPrompt);

      return res.status(200).json({
        reply,
      });
    }

    const prompt = `
You are an AI career assistant helping BCA students at The NorthCap University improve resumes professionally.

Student Details:
Name: ${name}
Year: ${year}
Specialization: ${specialization}

Skills:
${skills}

Projects:
${projects}

Experience:
${experience}

Tasks:
- Improve project descriptions professionally
- Improve experience wording
- Keep content ATS-friendly
- Keep language concise and realistic
- Do NOT invent fake achievements
- Return polished resume-ready content

Return format:

Projects:
...

Experience:
...
`;

    const reply =
      await askGemini(prompt);

    res.status(200).json({
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};