import Chatbots from "@/components/chatbots";
import SearchInput from "@/components/search-input";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
    searchParams: Promise<{
        categoryId: string;
        name: string;
    }>
}


const RootPage = async (props: RootPageProps) => {
    const searchParams = await props.searchParams;
    const data = await prismadb.chatbot.findMany({
        where: {
            name: {
                contains: searchParams.name,
                mode: "insensitive"
            }
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />

            <Chatbots data={data} />
        </div>
    );
}

export default RootPage;