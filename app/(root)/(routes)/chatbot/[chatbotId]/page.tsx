import prismadb from "@/lib/prismadb";
import ChatbotForm from "./components/chatbot-form";
import { auth } from "@clerk/nextjs/server";

interface ChatbotIdPageProps {
    params: Promise<{
        chatbotId: string;
    }>
}

const ChatbotIdPage = async (props: ChatbotIdPageProps) => {
    const params = await props.params;

    const { userId } = await auth();

    if (!userId) {
        return // clerk will send the user to the login page
    }

    const chatbot = await prismadb.chatbot.findUnique({
        where: {
            id: params.chatbotId,
            userId
        }
    });


    return (
        <ChatbotForm
            initialData={chatbot}
        />
    );
}

export default ChatbotIdPage;