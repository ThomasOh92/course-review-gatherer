const { onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const OpenAI = require("openai");

// Retrieve API key from Firebase secrets
const openaiKey = defineSecret("OPENAI_API_KEY");

exports.getOpenAIResponse = onCall({ cors: true , secrets: [openaiKey] }, async (request: any) => {

  try {
    const openai = new OpenAI({ apiKey: await openaiKey.value() });

    const { prompt, formattedReviews } = request.data;

    const systemMessage = `
    You are an AI assistant that answers user questions about online courses strictly based on the provided reviews.
    Follow these guidelines when generating responses:
  
    1. Start the response with a **structured summary**:
       - "Our database has X reviews that indicate that..."
       - Optionally, include a follow-up **nuanced sentence** if needed.
       - This entire section should be **no more than two sentences**.
  
    2. Follow with **bullet points**, each representing a **review that supports the structured summary**:
       - Maximum of 6 bullet points
       - Each bullet should contain:
         - **Review ID** (for reference only; do not display the review text)
         - **Source Name**
         - **Clickable Source URL**
       - Do not attempt to summarize or rewrite the reviews—simply reference their IDs.
  
    ⚠️ **Do NOT alter, rewrite, or paraphrase the reviews in any way.** The Review ID will be used separately to retrieve the full, unedited text.
  `;  

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: `Here are the course reviews:\n\n${formattedReviews}` },
        { role: "user", content: `Question: ${prompt}` }
      ],
    });

    return { message: completion.choices[0].message.content };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return{ error: "Failed to generate response" };
  }
  
});

