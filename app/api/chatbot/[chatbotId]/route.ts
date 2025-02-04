import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, props: { params: Promise<{ chatbotId: string }> }) {
    const params = await props.params;
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description } = body;

        if (!params.chatbotId) {
            return new NextResponse("Chatbot ID is required", { status: 401 })
        }

        if (!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const userName = user.firstName || user.username

        const chatbot = await prismadb.chatbot.update({
            where: {
                id: params.chatbotId,
                userId: user.id,
            },
            data: {
                userId: user.id,
                userName: userName!,
                src,
                name,
                description,
            }
        })

        return NextResponse.json(chatbot);
    } catch (error) {
        console.log("[CHATBOT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ chatbotId: string }> }) {
    const params = await props.params;
    try {
        const { userId } = await auth();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const chatbot = await prismadb.chatbot.delete({
            where: {
                userId,
                id: params.chatbotId,
            }
        });

        return NextResponse.json(chatbot)
    } catch (error) {
        console.log('[CHATBOT_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}