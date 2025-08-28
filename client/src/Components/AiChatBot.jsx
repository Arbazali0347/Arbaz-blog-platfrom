import { useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react"; // icons
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AiChatBot = () => {
    const messagesEndRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const { axios } = useAppContext()
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hi there 👋 How can I help you today?" },
    ]);
    const [input, setInput] = useState("");


    const sendMessage = async () => {
        if (!input.trim()) return;
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        // Pehle user ka message add kar do
        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        const currentInput = input;
        setInput("");

        setLoading(true)
        try {
            const { data } = await axios.post("/chat", { message: currentInput });
            if (data.success) {
                const botMessage = { role: "bot", text: data.reply };
                setMessages((prev) => [...prev, botMessage]);
            } else {
                const errorMsg = { role: "bot", text: "⚠️ " + data.message };
                setMessages((prev) => [...prev, errorMsg]);
            }
        } catch (error) {
            const errorMsg = { role: "bot", text: "❌ Server error: " + error.message };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setLoading(false); // 🆕 hide loading after response
        }
    };

    return (
        <div>
            {/* Floating Button (Open/Close) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-5 right-5 bg-primary text-white p-4 rounded-full shadow-lg transition"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-5 right-5 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-primary text-white p-3 rounded-t-lg">
                        <span className="font-semibold">Virtual Assistant</span>
                        <button onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg max-w-[80%] ${msg.role === "user"
                                    ? "bg-primary text-white ml-auto"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {/* 🆕 Loading state bubble */}
                        {loading && (
                            <div className="bg-gray-300 text-gray-700 p-2 rounded-lg inline-block animate-pulse">
                                Bot is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>

                    {/* Input Box */}
                    <div className="flex border-t p-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Write your message..."
                            className="flex-1 border rounded-lg px-2 py-1 text-sm"
                            onKeyDown={e => e.key === "Enter" && sendMessage()}

                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 bg-primary text-white px-3 py-1 rounded-lg hover:text-gray-800 transition cursor-pointer"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiChatBot;
