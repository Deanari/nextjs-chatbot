// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main () {
    try {
        await db.chatbot.createMany({
            data: [
                { name: "Sam", userId: "user_2sXmAncKglblzug3TFasdnHDIsy", userName: "Karen", src: "https://static.vecteezy.com/system/resources/thumbnails/019/039/987/small_2x/adorable-cute-white-cat-kawaii-style-sticker-design-free-png.png", description: "He is a cat",  },
                { name: "Birb", userId: "user_2sXmAncKglblzug3TFasdnHDIsy", userName: "Karen", src: "https://i.pinimg.com/originals/10/a7/86/10a7865a78d7d8a749f84484bc5757e7.png", description: "He is a bird",  },
            ]
        })

    } catch (error) {
        console.error("Error seeding default chatbots", error);
    } finally {
        await db.$disconnect();
    }
}

main();