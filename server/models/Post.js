import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    roll: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,

      enum: [
        "Career",
        "Exams",
        "Java",
        "Programming",
        "AI/ML",
        "General",
      ],

      default: "General",
    },

    replies: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        name: String,

        content: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;