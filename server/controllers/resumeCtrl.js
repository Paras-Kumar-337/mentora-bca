import Resume from "../models/Resume.js";


// ======================================
// CREATE / UPDATE RESUME
// ======================================

export const upsertResume = async (req, res) => {
  try {

    const {
      fullName,
      headline,
      summary,
      skills,
      projects,
      experience,
      education,
      certifications,
      achievements,
      links,
      template,
    } = req.body;


    // FIND EXISTING RESUME
    let resume = await Resume.findOne({
      user: req.user._id,
    });


    // CREATE NEW
    if (!resume) {

      resume = await Resume.create({
        user: req.user._id,

        fullName,
        headline,
        summary,

        skills,
        projects,
        experience,

        education,
        certifications,

        achievements,

        links,

        template,
      });

      return res.status(201).json(resume);
    }


    // UPDATE EXISTING
    resume.fullName = fullName || resume.fullName;

    resume.headline = headline || resume.headline;

    resume.summary = summary || resume.summary;

    resume.skills = skills || resume.skills;

    resume.projects = projects || resume.projects;

    resume.experience =
      experience || resume.experience;

    resume.education =
      education || resume.education;

    resume.certifications =
      certifications || resume.certifications;

    resume.achievements =
      achievements || resume.achievements;

    resume.links = links || resume.links;

    resume.template =
      template || resume.template;


    await resume.save();

    res.status(200).json(resume);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// GET RESUME
// ======================================

export const getResume = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {

      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.status(200).json(resume);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// DELETE RESUME
// ======================================

export const deleteResume = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {

      return res.status(404).json({
        message: "Resume not found",
      });
    }


    await resume.deleteOne();

    res.status(200).json({
      message: "Resume deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};