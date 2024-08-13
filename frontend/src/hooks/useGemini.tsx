import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const translate = async function(lang: string | undefined, message: string) {
    //console.log(import.meta.env.VITE_API_KEY)
    let langFull;

    if (lang === 'SP') {
        langFull = 'Spanish';
    } else {
        langFull = 'English';
    }

    const prompt = `Translate this message into ${langFull} without extra options: ${message}`

    const result = await model.generateContent(prompt);
    return result.response.text();
}