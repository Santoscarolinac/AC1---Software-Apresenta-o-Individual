
import { GoogleGenAI } from "@google/genai";
import { Trip } from "../types";

// IMPORTANT: This check is to prevent crashing in environments where process.env is not defined.
const apiKey = typeof process !== 'undefined' && process.env && process.env.API_KEY
  ? process.env.API_KEY
  : "YOUR_API_KEY"; // Fallback, though the app assumes env var is set.

if (apiKey === "YOUR_API_KEY") {
    console.warn("Gemini API key is not configured. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey });

export const generateTripSummary = async (trip: Trip): Promise<string> => {
    if (apiKey === "YOUR_API_KEY") {
        return "Serviço de IA não configurado. Dicas de segurança: 1. Confirme os dados do motorista. 2. Compartilhe sua viagem. 3. Use o cinto de segurança.";
    }
  
  const prompt = `
    Crie um resumo amigável e breve da viagem e forneça 3 dicas de segurança essenciais para uma viagem de carona, em Português do Brasil.
    O destino é "${trip.destination}".
    O nome do motorista é ${trip.driver.name}.
    Existem ${trip.passengers.length} outros passageiros.
    Formate a saída como texto limpo e legível. Não use Markdown.
    Comece com uma saudação amigável como "Aqui está o resumo da sua viagem!".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating trip summary:", error);
    return "Não foi possível gerar o resumo da viagem. Lembre-se de se manter seguro, compartilhar os detalhes da sua viagem com um amigo e confirmar a identidade do seu motorista.";
  }
};
