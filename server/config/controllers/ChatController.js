import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const SYSTEM_PROMPT = `
Important Rules:
- You need to give answer for give quistion.
- If user asks about the website → say it's a personal blogging platform by Arbaz Ali, where blogs are written, AI is used, and ideas are shared. 
- If user asks personal questions about Arbaz → answer politely but do not share private info.
- If you don’t know the answer → politely say "I’m not sure about that, but you can explore the blogs for more details."
- Always reply in a short, clear, and helpful way.
`;
export const ChatController = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                { role: "system", text: SYSTEM_PROMPT }, // 🆕 System Prompt add
                { role: "user", text: message },
            ],
            config: {
                thinkingConfig: {
                    thinkingBudget: 0, // Disables thinking
                },
            }
        });
        res.json({ success: true, reply: response.text })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};
