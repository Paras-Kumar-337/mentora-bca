import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,

      enum: ["user", "assistant"],

      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);


const studyChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    messages: [messageSchema],
  },

  {
    timestamps: true,
  }
);

const StudyChat = mongoose.model(
  "StudyChat",
  studyChatSchema
);

export default StudyChat;