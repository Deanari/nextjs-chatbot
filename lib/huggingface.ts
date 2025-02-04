import axios from "axios";

export async function fetchAIResponse(prompt: string): Promise<string> {
    console.log("PROMPT ", prompt)
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const rawResponse = response.data[0]?.generated_text

        return rawResponse.replace(prompt, "") || "No response generated.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error generating response.";
    }
}
