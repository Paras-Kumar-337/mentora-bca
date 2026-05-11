import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    batch: {
      type: String,
      enum: [
        "2022-25",
        "2023-26",
        "2024-27",
        "2025-28",
      ],
      required: true,
    },

    year: {
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

    cgpa: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },

    sgpa: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    roll: {
      type: String,
      required: true,
      unique: true,

      match: /^[0-9]{2}BCA[0-9]{3}$/i,
    },

    specialization: {
      type: String,

      enum: [
        "Web Application Development",
        "Mobile Application Development",
      ],

      required: true,
    },

    courses: {
      type: [String],
      default: [],
    },

    avatar: {
      type: String,
      default: "",
    },

    resetOtp: {
      type: String,
    },

    resetOtpExpire: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

// ======================================
// HASH PASSWORD BEFORE SAVE
// ======================================

userSchema.pre("save", async function () {

  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

const User = mongoose.model("User", userSchema);

export default User;