import DateSheet from "../models/Datesheet.js";


// ======================================
// CREATE EXAM ENTRY
// ======================================

export const createExam = async (req, res) => {
  try {

    const {
      subject,
      semester,
      examType,
      date,
      time,
      room,
    } = req.body;

    const exam = await DateSheet.create({
      subject,
      semester,
      examType,
      date,
      time,
      room,
      user: req.user._id,
    });

    res.status(201).json(exam);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// GET DATE SHEET
// ======================================

export const getDateSheet = async (req, res) => {
  try {

    const filters = {};

    if (req.query.user) {
      filters.user = req.query.user._id;
    }

    // FILTER BY SEMESTER
    if (req.query.semester) {
      filters.semester = req.query.semester;
    }

    // FILTER BY EXAM TYPE
    if (req.query.examType) {
      filters.examType = req.query.examType;
    }


    const exams = await DateSheet.find(filters)
      .sort({ date: 1 });

    res.status(200).json(exams);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// GET UPCOMING EXAMS
// ======================================

export const getUpcomingExams = async (req, res) => {
  try {

    const today = new Date();

    const exams = await DateSheet.find({
      user: req.user._id,
      date: {
        $gte: today,
      },
    })
      .sort({ date: 1 })
      .limit(5);

    res.status(200).json(exams);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};