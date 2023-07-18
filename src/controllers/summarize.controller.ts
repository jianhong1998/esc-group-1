import { RequestHandler } from 'express';
import { generateAiResponse } from '../services/openAi.service';
import AiResponse from '../models/openAi/response.model';
import ChatRequest from '../models/openAi/chatRequest.model';
import AiBehaviorContent from '../models/openAi/aiBehaviorContent.enum';
import { SummarizeMultipleNewsRequest } from '../models/summarise/summarizeRequest.model';
import {
    getMultipleNewsContent,
    getWebUrls,
} from '../services/webCrawler.service';
import SummarizeMultipleNewsResponse, {
    SummarizedNews,
} from '../models/summarise/summarizeResponse.model';

const summarizeController: RequestHandler<
    {},
    { response?: AiResponse; errorMessage: string; success: boolean },
    ChatRequest
> = async (req, res) => {
    try {
        const { message } = req.body;

        const aiResponse = await generateAiResponse(
            message,
            AiBehaviorContent.SUMMARIZE
        );

        res.status(200).send({
            response: aiResponse,
            errorMessage: '',
            success: true,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        res.status(500).send({
            errorMessage: message,
            success: false,
        });
    }
};

const summarizeMultipleNewsController: RequestHandler<
    {},
    SummarizeMultipleNewsResponse,
    undefined,
    SummarizeMultipleNewsRequest
> = async (req, res) => {
    const results = [] as SummarizedNews[];

    try {
        const { u: inputURL } = req.query;

        const pendingURLs = await getWebUrls(inputURL);

        const contents = await getMultipleNewsContent(pendingURLs);

        for (let i = 0; i < contents.length; i++) {
            const { message } = await generateAiResponse(
                contents[i].content,
                AiBehaviorContent.SUMMARIZE
            );

            if (typeof message === 'undefined') {
                throw new Error('message returned from AI is undefined.');
            }

            if (typeof message.content === 'undefined') {
                throw new Error('message returned from AI is undefined.');
            }

            results.push({ content: message.content, url: contents[i].url });
        }

        console.log(`Summarized news: ${results.length}`);

        return res.status(200).send({
            response: results,
            message: '',
            success: true,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        res.status(500).send({
            response: results,
            message,
            success: false,
        });
    }
};

export { summarizeController, summarizeMultipleNewsController };
