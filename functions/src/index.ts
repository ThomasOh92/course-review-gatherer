const { onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const OpenAI = require("openai");

// Retrieve API key from Firebase secrets
const openaiKey = defineSecret("OPENAI_API_KEY");

exports.getOpenAIResponse = onCall({ cors: true , secrets: [openaiKey] }, async (request: any) => {

  try {
    const openai = new OpenAI({ apiKey: await openaiKey.value() });

    const { prompt, reviews } = request.data;
    const systemMessage = "You are an AI assistant that answers user questions about online courses strictly based on the provided reviews. Use only the provided quotes and sources to generate your response.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: `Here are the course reviews:\n\n${reviews}` },
        { role: "user", content: `Question: ${prompt}` }
      ],
    });

    return { message: completion.choices[0].message.content };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return{ error: "Failed to generate response" };
  }
  
});

