import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

    totalClasses: {
      type: Number,
      default: 0,
      min: 0,
    },

    attendedClasses: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  {
    timestamps: true,
  }
);


// =====================================
// VIRTUAL PERCENTAGE
// =====================================

attendanceSchema.virtual("percentage").get(function () {

  if (this.totalClasses === 0) {
    return 0;
  }

  return (
    (this.attendedClasses / this.totalClasses) * 100
  );
});


// INCLUDE VIRTUALS IN JSON
attendanceSchema.set("toJSON", {
  virtuals: true,
});

attendanceSchema.set("toObject", {
  virtuals: true,
});


const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

export default Attendance;