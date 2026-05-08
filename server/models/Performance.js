import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    currentCGPA: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    semesterPerformance: [
      {
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

        sgpa: {
          type: Number,
          required: true,
          min: 0,
          max: 10,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);


const Performance = mongoose.model(
  "Performance",
  performanceSchema
);

export default Performance;