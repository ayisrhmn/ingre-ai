import { GoogleGenAI, HarmBlockThreshold, HarmCategory, MediaResolution } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { input, image } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      maxOutputTokens: 1500,
      mediaResolution: MediaResolution.MEDIA_RESOLUTION_LOW,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    };

    // Build parts array for the request
    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    if (image) {
      // Extract base64 data from data URL
      const base64Data = image.split(",")[1] || image;
      const mimeType = image.match(/data:(.*?);base64/)?.[1] || "image/jpeg";

      parts.push({
        inlineData: {
          mimeType,
          data: base64Data,
        },
      });
    }

    if (input) {
      parts.push({ text: input });
    }

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash-lite",
      config,
      contents: [
        {
          role: "user",
          parts,
        },
      ],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(chunk.text ?? ""));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
