import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, BaziResult, Language } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recommendationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Name of the crystal (Localized)" },
    englishName: { type: Type.STRING, description: "English name of the crystal (e.g. Amethyst) is REQUIRED for image generation." },
    color: { type: Type.STRING, description: "Color of the crystal" },
    element: { type: Type.STRING, description: "Associated Wu Xing element" },
    description: { type: Type.STRING, description: "Brief visual description" },
    benefits: { type: Type.STRING, description: "Why this helps the user specifically" },
  },
  required: ["name", "englishName", "color", "element", "description", "benefits"],
};

const baziSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    pillars: {
      type: Type.OBJECT,
      properties: {
        year: { type: Type.STRING },
        month: { type: Type.STRING },
        day: { type: Type.STRING },
        hour: { type: Type.STRING },
      },
      required: ["year", "month", "day", "hour"],
    },
    elementDistribution: {
      type: Type.OBJECT,
      properties: {
        metal: { type: Type.NUMBER, description: "Percentage value (0-100)" },
        wood: { type: Type.NUMBER, description: "Percentage value (0-100)" },
        water: { type: Type.NUMBER, description: "Percentage value (0-100)" },
        fire: { type: Type.NUMBER, description: "Percentage value (0-100)" },
        earth: { type: Type.NUMBER, description: "Percentage value (0-100)" },
      },
      required: ["metal", "wood", "water", "fire", "earth"],
    },
    dominantElement: { type: Type.STRING, description: "The strongest element (Localized name)" },
    missingElement: { type: Type.STRING, description: "The weakest or missing element (Localized name)" },
    luckyElement: { type: Type.STRING, description: "The Yong Shen (Useful God) element needed to balance (Localized name)" },
    analysis: { type: Type.STRING, description: "A simple, beginner-friendly analysis of the user's Bazi. MUST be easy to read and avoid complex jargon. (approx 100 words). MUST be in the requested language." },
    recommendations: {
      type: Type.ARRAY,
      items: recommendationSchema,
      description: "List of exactly 3 recommended crystals. ALL items must be fully populated.",
    },
    crystalKnowledge: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "A catchy title for the knowledge section (e.g., 'The Power of Wood Element', 'Crystal Cleansing')." },
        content: { type: Type.STRING, description: "Educational content explaining the theory of why these crystals help balancing the user's specific Bazi, OR a tip on how to cleanse/charge these specific crystals. Approx 80 words." }
      },
      required: ["title", "content"]
    }
  },
  required: ["pillars", "elementDistribution", "dominantElement", "missingElement", "luckyElement", "analysis", "recommendations", "crystalKnowledge"],
};

export const analyzeDestiny = async (profile: UserProfile, lang: Language): Promise<BaziResult> => {
  try {
    const isEnglish = lang === 'en';
    const languageInstruction = isEnglish
      ? 'Output Language: English. CRITICAL: All explanations, analysis, crystal descriptions, and knowledge content MUST be in English.'
      : 'Output Language: Simplified Chinese (zh-CN).';

    const prompt = `
      Act as a friendly and wise Crystal Advisor and Metaphysics enthusiast.
      
      User Profile:
      - Name: ${profile.name}
      - Gender: ${profile.gender}
      - Birth Date: ${profile.birthDate}
      - Birth Time: ${profile.birthTime}

      Task:
      1. Calculate the Ba Zi (Four Pillars) based on the birth date and time.
      2. Analyze the strength of the Five Elements (Wu Xing) in their chart.
      3. Identify the "Yong Shen" (Lucky Element) needed to balance their chart.
      4. Recommend EXACTLY 3 specific crystals that correspond to the Lucky Element or balance the chart.
      5. Provide a "Crystal Knowledge" section that explains the theory of how crystals interact with the body's energy field (Qi) specifically for this user's missing element.
      
      Output Rules:
      1. Return valid JSON matching the schema.
      2. ${languageInstruction}
      3. EXCEPTION: The "pillars" values (Year, Month, Day, Hour) MUST ALWAYS be the traditional Chinese GanZhi characters (e.g., "甲子"), regardless of the output language.
      4. The "analysis" MUST be very simple, warm, and easy to understand for a layperson. Avoid using deep technical terms like "Clashing", "Harming", or "Punishment" unless strictly necessary, and if used, explain them simply. Focus on which elements are strong/weak and what that means for their energy.
      5. The "crystalKnowledge.content" MUST be educational but accessible.
      6. CRITICAL: Ensure the "recommendations" array contains exactly 3 objects. Ensure "englishName" is provided for each crystal (e.g. "Amethyst") to ensure image generation works.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: baziSchema,
        temperature: 0.2, // Slight increase to make language more natural/friendly
        seed: 8888,
      },
    });

    if (!response.text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(response.text) as BaziResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const askCrystalExpert = async (message: string, lang: Language, history: any[] = []): Promise<string> => {
  try {
    const isEnglish = lang === 'en';
    
    // We are creating a simple chat for Q&A, not maintaining the full object in service to keep it stateless
    // Ideally we would pass the history to ai.chats.create()
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
         systemInstruction: `You are a friendly and wise Crystal and Feng Shui expert. 
         Your goal is to answer the user's questions about crystals, the Five Elements (Wu Xing), destiny (Bazi), and luck.
         Keep your answers concise (under 150 words), helpful, and soothing. 
         If the user asks about something unrelated, politely steer them back to crystals or metaphysics.
         ${isEnglish ? 'Reply in English.' : 'Reply in Simplified Chinese.'}`,
         temperature: 0.7 // A bit of creativity for conversation
      }
    });

    return response.text || (isEnglish ? "I'm meditating on that... please ask again." : "我正在冥想中...请稍后再试。");
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return lang === 'en' ? "The spirits are quiet right now. Please try again." : "灵力链接中断，请稍后再试。";
  }
}