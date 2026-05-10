import Post from "../models/Post.js";


// ===================================
// CREATE POST
// ===================================

export const createPost = async (req, res) => {
  try {

    const { content, category } = req.body;

    const post = await Post.create({
      author: req.user._id,
      name: req.user.name,
      roll: req.user.roll,
      content,
      category,
    });

    res.status(201).json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ===================================
// GET ALL POSTS
// ===================================

export const getPosts = async (req, res) => {
  try {

    const posts = await Post.find()
      .populate("author", "name avatar")
      .populate("replies.user", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ===================================
// ADD REPLY
// ===================================

export const addReply = async (req, res) => {
  try {

    const { content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const reply = {
      user: req.user._id,
      content,
    };

    post.replies.push(reply);

    await post.save();

    res.status(200).json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};