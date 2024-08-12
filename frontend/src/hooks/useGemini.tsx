import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = "AIzaSyC5V0k1EnhCIK_1JU_Sr5gb9_i2kZLPQXk";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const translate = async function(lang: string | undefined, message: string) {
    const prompt = `Translate this message into ${lang} without extra options: ${message}`

    const result = await model.generateContent(prompt);
    return result.response.text();
}