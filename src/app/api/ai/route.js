// interactive-teacher-gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]);

export async function GET(req) {
  try {
    const level = req.nextUrl.searchParams.get("level") || "beginner";
    const userQuestion =
      req.nextUrl.searchParams.get("question") || "What is gravity?";
    const speech = req.nextUrl.searchParams.get("speech") || "formal";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a friendly, interactive AI teacher who explains concepts clearly and engagingly.
The student may ask ANY question. Always respond ONLY in JSON (no markdown fences, no extra text).

Schema:
{
  "topic": "Brief title of the topic",
  "answer": "Your detailed answer to the student's question in English. Use ${speech === "casual" ? "a casual, conversational tone" : "a professional, formal tone"}.",
  "additionalInfo": "Optional additional information or context about the topic",
  "example": [{ "scenario": "Example application of this concept", "explanation": "Brief explanation of how it applies" }],
  "followUpQuestion": "A thoughtful follow-up question to encourage deeper learning"
}

The student asked: "${userQuestion}".
Explain at a ${level} level.
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text().trim();

    // Strip Markdown fences if Gemini still adds them
    if (text.startsWith("```")) {
      text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    }

    // Try to parse JSON
    let response;
    try {
      response = JSON.parse(text);
    } catch (e) {
      console.warn("⚠️ Gemini returned invalid JSON, using fallback.");
      response = {
        topic: "General Knowledge",
        answer: text,
        additionalInfo: "",
        example: [],
        followUpQuestion: "Would you like me to explore this topic further?"
      };
    }

    return Response.json(response);
  } catch (error) {
    console.error("❌ Gemini Interactive Teacher Error:", error);
    return Response.json(
      { error: "Something went wrong while generating the lesson." },
      { status: 500 }
    );
  }
}
