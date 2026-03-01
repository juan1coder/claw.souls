import { GoogleGenAI, Type } from "@google/genai";
import { SoulQuestion, GeminiModel } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRefinementQuestions = async (coreIdea: string): Promise<SoulQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: `The user wants to create a "Soul File" (a system prompt/persona) for an AI agent. 
      The user's core idea is: "${coreIdea}".
      
      Generate 4 specific, probing questions to help refine this soul. 
      Ask about things like specific tone, intended audience, constraints, or unique personality quirks (e.g., is it a pirate? a strict logician?).
      Do not ask generic questions if possible. Tailor them to the core idea.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              placeholder: { type: Type.STRING, description: "A suggested short answer example" }
            },
            required: ["id", "question", "placeholder"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as SoulQuestion[];
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate refinement questions. Please try again.");
  }
};

export const generateSoulFile = async (coreIdea: string, answers: Record<string, string>): Promise<string> => {
  try {
    const formattedAnswers = Object.entries(answers)
      .map(([id, answer]) => `- [Refinement]: ${answer}`)
      .join("\n");

    const prompt = `
    Role: Expert System Prompt Engineer & Creative Writer.
    Task: Write a "Soul File" for an automated agent (bot).
    
    Core Concept: "${coreIdea}"
    
    User Refinements:
    ${formattedAnswers}
    
    Output Instructions:
    - The output must be a raw text file content.
    - Minimal markdown formatting (use clear headers).
    - It must serve as a functional system prompt.
    - It must allow the AI to *become* the character described while adhering to strict directives.
    - Sections to include: 
      1. CORE IDENTITY (Who/What am I?)
      2. PRIME DIRECTIVES (What must I do?)
      3. BEHAVIOR & TONE (How do I speak/act?)
      4. KNOWLEDGE & CONSTRAINTS (What do I know/not know?)
    
    Tone requirement: The text of the soul file itself should feel technical yet infused with the requested character's flavor where appropriate for examples.
    `;

    const response = await ai.models.generateContent({
      model: GeminiModel.PRO,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 1024 } 
      }
    });

    return response.text || "Failed to generate soul.";
  } catch (error) {
    console.error("Error generating soul:", error);
    throw new Error("Failed to forge the soul. Please try again.");
  }
};
