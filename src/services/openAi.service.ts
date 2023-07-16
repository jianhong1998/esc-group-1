import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import AiResponse from '../models/openAi/response.model';
import AiBehaviorContent from '../models/openAi/aiBehaviorContent.enum';

dotenv.config();

const API_KEY = process.env.API_KEY || '';

const configuration = new Configuration({
    apiKey: API_KEY,
});

const openAi = new OpenAIApi(configuration);

const generateAiResponse = async (
    question: string,
    aiBehaviorContent: AiBehaviorContent
): Promise<AiResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await openAi.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: aiBehaviorContent,
                    },
                    {
                        role: 'user',
                        content: question,
                    },
                ],
                temperature: 0,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });

            const { data } = response;

            resolve(data.choices[0]);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : String(error);

            reject(message);
        }
    });
};

export { openAi, generateAiResponse };
