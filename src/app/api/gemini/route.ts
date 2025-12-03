import { GoogleGenAI, HarmBlockThreshold, HarmCategory, MediaResolution } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Check if it's a rate limit error
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i); // Exponential backoff
        console.log(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }

  throw lastError;
}

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

    // Use retry mechanism for rate limit handling
    const stream = await retryWithBackoff(() =>
      ai.models.generateContentStream({
        model: "gemini-2.0-flash-lite",
        config,
        contents: [
          {
            role: "user",
            parts,
          },
        ],
      }),
    );

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
  } catch (err: any) {
    console.error("Gemini API Error:", err);

    // Handle rate limit error
    if (err.status === 429) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a moment and try again.",
          retryAfter: 60,
        },
        { status: 429 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: err.message || "Server Error" },
      { status: err.status || 500 },
    );
  }
}
