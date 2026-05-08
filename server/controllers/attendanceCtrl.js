import Attendance from "../models/Attendance.js";


// ======================================
// CREATE / UPDATE ATTENDANCE
// ======================================

export const upsertAttendance = async (req, res) => {
  try {

    const {
      subject,
      semester,
      totalClasses,
      attendedClasses,
    } = req.body;


    // CHECK EXISTING RECORD
    let attendance = await Attendance.findOne({
      user: req.user._id,
      subject,
    });


    // UPDATE EXISTING
    if (attendance) {

      attendance.totalClasses = totalClasses;

      attendance.attendedClasses = attendedClasses;

      await attendance.save();

      return res.status(200).json(attendance);
    }


    // CREATE NEW
    attendance = await Attendance.create({
      user: req.user._id,
      subject,
      semester,
      totalClasses,
      attendedClasses,
    });

    res.status(201).json(attendance);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// GET USER ATTENDANCE
// ======================================

export const getAttendance = async (req, res) => {
  try {

    const filters = {
      user: req.user._id,
    };


    // FILTER BY SEMESTER
    if (req.query.semester) {
      filters.semester = req.query.semester;
    }


    const attendance = await Attendance.find(filters)
      .sort({ subject: 1 });

    res.status(200).json(attendance);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// DASHBOARD SUMMARY
// ======================================

export const getAttendanceSummary = async (req, res) => {
  try {

    const attendance = await Attendance.find({
      user: req.user._id,
    });

    if (attendance.length === 0) {
      return res.status(200).json({
        averageAttendance: 0,
      });
    }


    const totalPercentage =
      attendance.reduce((acc, item) => {
        return acc + item.percentage;
      }, 0);


    const averageAttendance = Math.round(
      totalPercentage / attendance.length
    );

    res.status(200).json({
      averageAttendance,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const markAttendance = async (req, res) => {
  try {

    const { subject, semester, status } = req.body;


    // FIND EXISTING RECORD
    let attendance = await Attendance.findOne({
      user: req.user._id,
      subject,
    });


    // CREATE IF NOT EXISTS
    if (!attendance) {

      attendance = await Attendance.create({
        user: req.user._id,
        subject,
        semester,
        totalClasses: 0,
        attendedClasses: 0,
      });
    }


    // ALWAYS INCREMENT TOTAL
    attendance.totalClasses += 1;


    // IF PRESENT
    if (status === "present") {
      attendance.attendedClasses += 1;
    }


    await attendance.save();

    res.status(200).json(attendance);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};