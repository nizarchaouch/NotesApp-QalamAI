import { GoogleGenAI } from "@google/genai";
import { config } from "../config/env";

class GeminiService {
  private client: GoogleGenAI;
  private model: string;

  constructor() {
    if (!config.gemini.apiKey) {
      throw new Error(
        "GEMINI_API_KEY is required. Please set it in your .env file.",
      );
    }

    this.client = new GoogleGenAI({
      apiKey: config.gemini.apiKey,
    });

    this.model = config.gemini.model || "gemini-2.5-flash";
  }

  private async generate(prompt: string): Promise<string> {
    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
    });

    return response.text || "Failed to generate response";
  }

  async summarize(text: string): Promise<string> {
    const prompt = `
    You are a helpful assistant that summarizes text concisely.
    Always respond in the same language as the input text.

    Please summarize the following text:

    ${text}
    `;

    return this.generate(prompt);
  }

  async rewrite(
    text: string,
    mode: "comedy" | "formal" | "casual",
  ): Promise<string> {
    const modeInstructions = {
      comedy:
        "Rewrite it in a humorous, witty, and entertaining tone. Add comedic elements while keeping the main message.",
      formal: "Rewrite it in a formal, professional tone.",
      casual: "Rewrite it in a casual, conversational tone.",
    };

    const prompt = `
    You are a helpful assistant that rewrites text.
    ${modeInstructions[mode]}
    Always respond in the same language as the input text.

    Please rewrite the following text:

    ${text}
    `;

    return this.generate(prompt);
  }

  async translate(text: string): Promise<string> {
    const prompt = `
    You are a professional translator.

    Detect the language of the input text:
    - If the text is in English, translate it to Arabic.
    - If the text is in Arabic, translate it to English.

    Maintain the original meaning, tone, and style.
    Only provide the translation, no explanations.

    Text:
    ${text}
    `;

    return this.generate(prompt);
  }
}

export const geminiService = new GeminiService();
