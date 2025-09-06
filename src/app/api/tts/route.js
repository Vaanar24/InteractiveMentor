import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const text =
      searchParams.get("text") || "Hello, I am excited to try ElevenLabs!";
    const teacher = searchParams.get("teacher") || "default";

    // 🔑 Map teacher names to actual ElevenLabs voice IDs
    const voiceMap = {
      Nanami: process.env.ELEVEN_LABS_VOICE_ID_NANAMI,
      Chloe: process.env.ELEVEN_LABS_VOICE_ID_CHLOE,
      default: process.env.ELEVEN_LABS_VOICE_ID,
    };

    const voiceId = voiceMap[teacher];

    if (!voiceId) {
      throw new Error(`No voice ID found for teacher: ${teacher}`);
    }

    console.log("🔊 Using ElevenLabs Voice ID:", voiceId);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVEN_LABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: process.env.ELEVEN_LABS_MODEL_ID || "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.3,
            similarity_boost: 0.8,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("❌ ElevenLabs API error:", errText);
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=tts.mp3",
      },
    });
  } catch (error) {
    console.error("❌ TTS Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
