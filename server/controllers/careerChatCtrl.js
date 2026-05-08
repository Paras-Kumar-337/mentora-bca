import CareerChat from "../models/CareerChat.js";


// ======================================
// GET CHAT HISTORY
// ======================================

export const getCareerChat = async (req, res) => {
  try {

    let chat = await CareerChat.findOne({
      user: req.user._id,
    });


    // CREATE EMPTY CHAT IF NONE
    if (!chat) {

      chat = await CareerChat.create({
        user: req.user._id,
        messages: [],
      });
    }

    res.status(200).json(chat);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// ADD MESSAGE
// ======================================

export const addCareerMessage = async (req, res) => {
  try {

    const { role, content } = req.body;


    let chat = await CareerChat.findOne({
      user: req.user._id,
    });


    // CREATE CHAT IF NONE
    if (!chat) {

      chat = await CareerChat.create({
        user: req.user._id,
        messages: [],
      });
    }


    // PUSH NEW MESSAGE
    chat.messages.push({
      role,
      content,
    });


    await chat.save();

    res.status(200).json(chat);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// CLEAR CHAT
// ======================================

export const clearCareerChat = async (req, res) => {
  try {

    const chat = await CareerChat.findOne({
      user: req.user._id,
    });

    if (!chat) {

      return res.status(404).json({
        message: "Chat not found",
      });
    }


    chat.messages = [];

    await chat.save();

    res.status(200).json({
      message: "Career chat cleared",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};