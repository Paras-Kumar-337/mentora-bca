import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
    },

    semester: {
      type: String,

      enum: [
        "1st Year - 1st sem",
        "1st Year - 2nd sem",
        "2nd Year - 3rd sem",
        "2nd Year - 4th sem",
        "3rd Year - 5th sem",
        "3rd Year - 6th sem",
      ],

      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    fileUrl: {
      type: String,
      default: "",
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;