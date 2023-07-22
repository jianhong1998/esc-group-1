import { RequestHandler } from 'express';
import API_Response from '../models/apiResponse';
import { getNewsContent, getWebUrls } from '../services/webCrawler.service';
import { generateAiResponse } from '../services/openAi.service';
import AiBehaviorContent from '../models/openAi/aiBehaviorContent.enum';

const combineOperationHandler: RequestHandler<
    {},
    API_Response<{ translatedNews: string; fullNews: string; url: string }>,
    undefined,
    { u: string }
> = async (req, res) => {
    try {
        let { u: inputURL } = req.query;

        let { content: fullNews } = await getNewsContent(inputURL);

        const pendingURLs = await getWebUrls(inputURL);

        while (
            (typeof fullNews === 'undefined' ||
                fullNews === null ||
                fullNews.length === 0) &&
            pendingURLs.length > 0
        ) {
            inputURL = pendingURLs.pop()!;

            fullNews = (await getNewsContent(inputURL)).content;
        }

        if (
            typeof fullNews === 'undefined' ||
            fullNews === null ||
            fullNews.length === 0
        ) {
            throw new Error('combineOperationHandler: fullNews no content.');
        }

        let aiResponse = await generateAiResponse(
            fullNews,
            AiBehaviorContent.SUMMARIZE
        );

        if (typeof aiResponse.message === 'undefined') {
            throw new Error(
                'combineOperationHandler: aiResponse.message (summarize) is undefined.'
            );
        }

        if (typeof aiResponse.message.content === 'undefined') {
            throw new Error(
                'combineOperationHandler: aiResponse.message.content (summarize) is undefined.'
            );
        }

        const summarisedNews = aiResponse.message.content;

        aiResponse = await generateAiResponse(
            summarisedNews,
            AiBehaviorContent.TRANSLATE
        );

        if (typeof aiResponse.message === 'undefined') {
            throw new Error(
                'combineOperationHandler: aiResponse.message (translate) is undefined.'
            );
        }

        if (typeof aiResponse.message.content === 'undefined') {
            throw new Error(
                'combineOperationHandler: aiResponse.message.content (translate) is undefined.'
            );
        }

        const translatedNews = aiResponse.message.content;

        res.status(200).send({
            response: { translatedNews, fullNews, url: inputURL },
            errorMessage: '',
            success: true,
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : JSON.stringify(error);

        res.status(500).send({
            errorMessage,
            success: false,
        });
    }
};

export { combineOperationHandler };
