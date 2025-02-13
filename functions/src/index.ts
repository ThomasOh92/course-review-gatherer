/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const OpenAI = require("openai");

// Retrieve API key from Firebase secrets
const openaiKey = defineSecret("OPENAI_API_KEY");

exports.getOpenAIResponse = onRequest({ cors: true }, { secrets: [openaiKey] }, async (req: any, res: any) => {

  try {
    const openai = new OpenAI({ apiKey: openaiKey.value() });

    const { prompt, reviews } = req.body;
    const systemMessage = "You are an AI assistant that answers user questions about online courses strictly based on the provided reviews. Use only the provided quotes and sources to generate your response.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: `Here are the course reviews:\n\n${reviews}` },
        { role: "user", content: `Question: ${prompt}` }
      ],
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

