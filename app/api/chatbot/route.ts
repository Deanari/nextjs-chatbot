import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description } = body;

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const chatbot = await prismadb.chatbot.create({
            data: {
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
            }
        })

        return NextResponse.json(chatbot);
    } catch (error) {
        console.log("[CHATBOT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}