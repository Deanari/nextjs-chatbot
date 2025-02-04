import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatClient from "./components/client";

interface ChatIdPageProps {
    params: Promise<{
        chatId: string
    }>
}

const ChatIdPage = async (props: ChatIdPageProps) => {
    const params = await props.params;
    const { userId } = await auth();

    if (!userId) {
        return
    }

    const chatbot = await prismadb.chatbot.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
                where: {
                    userId,
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });


    if (!chatbot) {
        return redirect("/");
    }


    return (
        <ChatClient chatbot={chatbot} />
    );
}

export default ChatIdPage;