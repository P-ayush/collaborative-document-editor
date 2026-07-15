import { gemini } from "@/lib/gemini";

export async function summarizeDocument(
    content: string
) {
    const response =
        await gemini.models.generateContent({
            model: "gemini-2.5-flash",

            contents: `
You are an expert document assistant.

Summarize the following document into concise bullet points.

Document:

${content}
`,
        });

    return response.text;
}