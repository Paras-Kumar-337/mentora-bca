import mongoose from "mongoose";

const dateSheetSchema = new mongoose.Schema(
  {
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

    examType: {
      type: String,

      enum: [
        "Minor Test",
        "Major Test",
        "Mid Term Practical",
        "End Term Practical",
      ],

      default: "Minor Test",
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      default: "",
    },

    room: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);

const DateSheet = mongoose.model(
  "DateSheet",
  dateSheetSchema
);

export default DateSheet;