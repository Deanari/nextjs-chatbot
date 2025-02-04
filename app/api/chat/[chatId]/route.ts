import { currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { fetchAIResponse } from "@/lib/huggingface";

export async function POST(
    request: Request,
    { params }: { params: { chatId: string } }

) {
    try {
        const { prompt } = await request.json();
        const user = await currentUser();

        if (!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chatbot = await prismadb.chatbot.update({
            where: {
                id: params.chatId,
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: "user",
                        userId: user.id,
                    }
                }
            }
        });

        if (!chatbot) {
            return new NextResponse("chatbot not found", { status: 404 });
        }

        const response = await fetchAIResponse(prompt);

        await prismadb.chatbot.update({
            where: {
                id: params.chatId,
            },
            data: {
                messages: {
                    create: {
                        content: response.trim(),
                        role: "system",
                        userId: user.id
                    }
                }
            }
        })


        return new NextResponse(JSON.stringify({ response }), { status: 200 });


    } catch (error) {
        console.log("[CHAT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}