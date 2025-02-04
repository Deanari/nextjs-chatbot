"use client";

import ChatHeader from "@/components/chat-header";
import { Chatbot, Message } from "@prisma/client";
import ChatForm from "@/components/chat-form";
import ChatMessages from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";
import { ChangeEvent, FormEvent, useState } from "react";

interface ChatClientProps {
    chatbot: Chatbot & {
        messages: Message[];
        _count: {
            messages: number;
        }
    }
};

const ChatClient = ({ chatbot }: ChatClientProps) => {
    const [messages, setMessages] = useState<ChatMessageProps[]>(chatbot.messages);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return; // Prevent empty submissions

        const userMessage: ChatMessageProps = { role: "user", content: input };
        setMessages((current) => [...current, userMessage]);

        setIsLoading(true);
        setInput("");

        try {
            const res = await fetch(`/api/chat/${chatbot.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input }),
            });

            if (!res.ok) throw new Error("Failed to fetch AI response");

            const data = await res.json();

            const aiMessage: ChatMessageProps = { role: "system", content: data.response };
            setMessages((current) => [...current, aiMessage]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader chatbot={chatbot} />
            <ChatMessages 
                chatbot={chatbot} 
                isLoading={isLoading} 
                messages={messages} 
            />
            <ChatForm
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default ChatClient;
