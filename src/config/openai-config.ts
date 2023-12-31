import OpenAI from "openai"

export const configureOpenAi = () => {
    const config = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });
    return config;
}