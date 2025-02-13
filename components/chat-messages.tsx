"use client"

import { Chatbot } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "@/components/chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
    messages: ChatMessageProps[];
    isLoading: boolean;
    chatbot: Chatbot;
}

const ChatMessages = ({
    messages = [],
    isLoading,
    chatbot
}: ChatMessagesProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null);
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({behavior: "smooth"});
    }, [messages.length]);

    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                isLoading={fakeLoading}
                src={chatbot.src}
                role="system"
                content={`Hello, I am ${chatbot.name}`}
            />
            {
                messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        role={message.role}
                        content={message.content}
                        src={chatbot.src}
                    />
                ))
            }
            {
                isLoading && (
                    <ChatMessage
                        role="system"
                        src={chatbot.src}
                        isLoading
                    />
                )
            }
            <div ref={scrollRef} />
        </div>
    );
}

export default ChatMessages;