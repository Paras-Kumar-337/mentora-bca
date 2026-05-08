import Note from "../models/Note.js";


// ======================================
// CREATE NOTE
// ======================================

export const createNote = async (req, res) => {
  try {

    const {
      title,
      subject,
      semester,
      content,
      fileUrl,
      isPublic,
    } = req.body;

    const note = await Note.create({
      uploadedBy: req.user._id,
      title,
      subject,
      semester,
      content,
      fileUrl,
      isPublic,
    });

    res.status(201).json(note);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// GET ALL NOTES
// ======================================

export const getNotes = async (req, res) => {
  try {

    const filters = {};

    // FILTER BY SEMESTER
    if (req.query.semester) {
      filters.semester = req.query.semester;
    }

    // FILTER BY SUBJECT
    if (req.query.subject) {
      filters.subject = req.query.subject;
    }


    const notes = await Note.find(filters)
      .sort({ createdAt: -1 });

    res.status(200).json(notes);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// DELETE NOTE
// ======================================

export const deleteNote = async (req, res) => {
  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }


    // SECURITY CHECK
    if (
      note.uploadedBy.toString() !==
      req.user._id.toString()
    ) {

      return res.status(401).json({
        message: "Unauthorized",
      });
    }


    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};