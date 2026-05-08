import Performance from "../models/Performance.js";


// ======================================
// CREATE / UPDATE PERFORMANCE
// ======================================

export const upsertPerformance = async (req, res) => {
  try {

    const {
      currentCGPA,
      semester,
      sgpa,
    } = req.body;


    // FIND EXISTING RECORD
    let performance = await Performance.findOne({
      user: req.user._id,
    });


    // CREATE IF NOT EXISTS
    if (!performance) {

      performance = await Performance.create({
        user: req.user._id,
        currentCGPA,
        semesterPerformance: [
          {
            semester,
            sgpa,
          },
        ],
      });

      return res.status(201).json(performance);
    }


    // UPDATE CGPA
    performance.currentCGPA = currentCGPA;


    // CHECK EXISTING SEM ENTRY
    const existingSemester =
      performance.semesterPerformance.find(
        (item) => item.semester === semester
      );


    // UPDATE EXISTING SGPA
    if (existingSemester) {

      existingSemester.sgpa = sgpa;

    } else {

      // ADD NEW SEMESTER
      performance.semesterPerformance.push({
        semester,
        sgpa,
      });
    }


    await performance.save();

    res.status(200).json(performance);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// GET PERFORMANCE
// ======================================

export const getPerformance = async (req, res) => {
  try {

    const performance = await Performance.findOne({
      user: req.user._id,
    });

    if (!performance) {
  return res.status(200).json({
    currentCGPA: 0,
    semesterPerformance: [],
  });
}

    res.status(200).json(performance);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};