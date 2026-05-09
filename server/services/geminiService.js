import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
  });

export async function askGemini(
  prompt,
  image = null
) {

  let result;

  // ======================================
  // MULTIMODAL REQUEST
  // ======================================

  if (image) {

    result = await model.generateContent([
      {
        text: prompt,
      },
      {
        inlineData: {
          mimeType: image.mimetype,
          data: image.buffer.toString("base64"),
        },
      },
    ]);

  } else {

    // ======================================
    // TEXT ONLY REQUEST
    // ======================================

    result = await model.generateContent(
      prompt
    );
  }

  return result.response.text();
}