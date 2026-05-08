import StudyChat from "../models/StudyChat.js";
import { askGemini } from "../services/geminiService.js";
import { semesterSubjects } from "../../shared/constants/subjects.js";


// ======================================
// GET STUDY CHAT
// ======================================

export const getStudyChat = async (req, res) => {
  try {

    let chat = await StudyChat.findOne({
      user: req.user._id,
    });


    // CREATE EMPTY CHAT IF NONE
    if (!chat) {

      chat = await StudyChat.create({
        user: req.user._id,
        messages: [],
      });
    }

    res.status(200).json(chat);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// ADD MESSAGE
// ======================================

export const addStudyMessage = async (req, res) => {
  try {

    const {
      role = "user",
      content,
      message,
    } = req.body;

    const finalMessage =
      content || message;

    const image = req.file || null;


    let chat = await StudyChat.findOne({
      user: req.user._id,
    });


    // CREATE CHAT IF NONE
    if (!chat) {

      chat = await StudyChat.create({
        user: req.user._id,
        messages: [],
      });
    }


    // ADD MESSAGE
    chat.messages.push({
      role,
      content: finalMessage,
    });

    const semesterMap = {
      1: "1st Year - 1st sem",
      2: "1st Year - 2nd sem",
      3: "2nd Year - 3rd sem",
      4: "2nd Year - 4th sem",
      5: "3rd Year - 5th sem",
      6: "3rd Year - 6th sem",
    };

    const currentSemester =
      semesterMap[Number(req.user.year)] || req.user.year;

    const currentSubjects =
      semesterSubjects[currentSemester] || [];

    const allCurriculum = JSON.stringify(
      semesterSubjects,
      null,
      2
    );

    console.log("ARIA SEMESTER:", currentSemester);
    console.log("ARIA SUBJECTS:", currentSubjects);

    // ======================================
    // BUILD CONTEXTUAL PROMPT
    // ======================================

    const prompt = `
You are ARIA (Academic Resource & Intelligence Assistant),
an AI academic companion designed specifically for BCA students at The NorthCap University (NCU).

You help students with:
- BCA subjects
- coding concepts
- practical exams
- viva preparation
- semester planning
- attendance management
- productivity
- placement preparation
- career guidance
- project ideas

Student Details:
Name: ${req.user.name}
Semester: ${req.user.year}
CGPA: ${req.user.cgpa}
SGPA: ${req.user.sgpa}
Specialization: ${req.user.specialization}
Courses: ${req.user.courses?.join(", ")}
Current Semester Curriculum:
${currentSubjects.join(", ")}

Official NCU BCA Curriculum:
${allCurriculum}

Official NCU Attendance Policy:
- Minimum 70% attendance is mandatory for all subjects.
- Exception: MOOC-based Open Electives do not require the standard 70% attendance.
- Exception: Community Service subjects do not require the standard 70% attendance.
- Never provide random attendance percentages.
- Always reference this official attendance policy when students ask about attendance.

Official NCU BCA Evaluation Criteria:
- Evaluation usually includes Minor Tests, Major Tests, Assignments, Quizzes, and Lab Practicals.
- Minor Tests are usually conducted in October for odd semesters and March for even semesters.
- Major Tests are usually conducted in December for odd semesters and May for even semesters.
- Assignments and quizzes are generally conducted through Canvas.
- Practical subjects usually include Mid-Term Lab Practical and End-Term Lab Practical evaluations.
- Never invent random evaluation structures or exam schedules.
- Always reference this official evaluation structure when students ask about exams, marks, or assessment patterns.

Student Question:
${finalMessage}

Guidelines:
- Keep responses concise and well-structured
- Use bullet points where helpful
- Use markdown formatting naturally
- Explain technical concepts simply
- Prefer practical examples relevant to BCA students at NCU
- ONLY use subjects from the provided Official NCU BCA Curriculum
- NEVER invent or hallucinate subjects outside the provided curriculum
- When asked about next semester subjects, use the exact curriculum data provided
- When asked about attendance, ONLY use the provided Official NCU Attendance Policy
- When asked about exams or evaluation, ONLY use the provided Official NCU BCA Evaluation Criteria
- Reference semester subjects naturally when relevant
- Give practical academic advice instead of generic motivation
- Keep a friendly and intelligent conversational tone
- Avoid overly robotic wording
- If coding is involved, provide clean readable examples
`;


    // ======================================
    // GEMINI RESPONSE
    // ======================================

    const aiReply = await askGemini(
      prompt,
      image
    );


    // SAVE AI MESSAGE
    chat.messages.push({
      role: "assistant",
      content: aiReply,
    });


    await chat.save();

    res.status(200).json({
      reply: aiReply,
      chat,
    });

  } catch (error) {

    console.log("ARIA ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// CLEAR CHAT
// ======================================

export const clearStudyChat = async (req, res) => {
  try {

    const chat = await StudyChat.findOne({
      user: req.user._id,
    });

    if (!chat) {

      return res.status(404).json({
        message: "Chat not found",
      });
    }


    chat.messages = [];

    await chat.save();

    res.status(200).json({
      message: "Study chat cleared",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};