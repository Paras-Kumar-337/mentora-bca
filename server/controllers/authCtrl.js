import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


// ============================
// SIGNUP USER
// ============================

export const signupUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      batch,
      year,
      cgpa,
      sgpa,
      roll,
      specialization,
      courses,
    } = req.body;


    // CHECK EXISTING EMAIL
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }


    // CHECK EXISTING ROLL
    const existingRoll = await User.findOne({ roll });

    if (existingRoll) {
      return res.status(400).json({
        message: "Roll number already exists",
      });
    }


    // CREATE USER
    const user = await User.create({
      name,
      email,
      password,
      batch,
      year,
      cgpa,
      sgpa,
      roll,
      specialization,
      courses,
      avatar: req.body.avatar || "",
    });


    // RESPONSE
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ============================
// LOGIN USER
// ============================

export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;


    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }


    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }


    // RESPONSE
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const sendResetOtp = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetOtp = otp;

    user.resetOtpExpire =
      Date.now() + 10 * 60 * 1000;

    await user.save();

    const transporter =
      nodemailer.createTransport({

        host: "smtp-relay.brevo.com",

        port: 587,

        secure: false,

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },

        tls: {
          rejectUnauthorized: false,
        },

        connectionTimeout: 10000,

      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        "Mentora Password Reset OTP",

      html: `
        <div style="font-family:sans-serif;padding:20px;">

          <h2>Mentora Password Reset</h2>

          <p>
            Your OTP is:
          </p>

          <h1 style="letter-spacing:4px;">
            ${otp}
          </h1>

          <p>
            This OTP will expire in 10 minutes.
          </p>

        </div>
      `,
    });

    res.status(200).json({
      message:
        "OTP sent successfully",
    });

  } catch (error) {

    console.log("OTP MAIL ERROR:", error);

    res.status(500).json({
      message:
        "Failed to send OTP",
    });
  }
};

export const resetPassword = async (
  req,
  res
) => {

  try {

    const {
      email,
      otp,
      password,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      user.resetOtp !== otp
    ) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (
      user.resetOtpExpire < Date.now()
    ) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    user.password = password;

    user.resetOtp = undefined;

    user.resetOtpExpire = undefined;

    await user.save();

    res.status(200).json({
      message:
        "Password reset successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Password reset failed",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    // UPDATE FIELDS
    user.name = req.body.name || user.name;

    user.batch = req.body.batch || user.batch;

    user.year = req.body.year || user.year;

    user.cgpa = req.body.cgpa || user.cgpa;

    user.sgpa = req.body.sgpa || user.sgpa;

    user.roll = req.body.roll || user.roll;

    user.specialization =
      req.body.specialization || user.specialization;

    user.courses =
      req.body.courses || user.courses;

    user.avatar =
      req.body.avatar !== undefined
        ? req.body.avatar
        : user.avatar;


    // OPTIONAL PASSWORD UPDATE
    if (req.body.password) {
      user.password = req.body.password;
    }


    const updatedUser = await user.save();


    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      batch: updatedUser.batch,
      year: updatedUser.year,
      cgpa: updatedUser.cgpa,
      sgpa: updatedUser.sgpa,
      roll: updatedUser.roll,
      specialization: updatedUser.specialization,
      courses: updatedUser.courses,
    });

  } catch (error) {

    console.log("PROFILE UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }
};
