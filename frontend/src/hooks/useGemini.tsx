import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const translate = async function(lang: string, message: string) {
    const prompt = `Translate this message into ${lang} without extra options: ${message}`

    const result = await model.generateContent(prompt);
    return result;
}