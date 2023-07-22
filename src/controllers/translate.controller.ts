import { RequestHandler } from 'express';
import API_Response from '../models/apiResponse';
import { generateAiResponse } from '../services/openAi.service';
import AiBehaviorContent from '../models/openAi/aiBehaviorContent.enum';

const translateContentHandler: RequestHandler<
    {},
    API_Response<string>,
    { content: string }
> = async (req, res) => {
    try {
        const { content } = req.body;

        const aiResponse = await generateAiResponse(
            content,
            AiBehaviorContent.TRANSLATE
        );

        if (typeof aiResponse.message === 'undefined') {
            throw new Error(
                'translateContentHandler: message is not in aiResponse'
            );
        }

        if (typeof aiResponse.message.content === 'undefined') {
            throw new Error(
                'translateContentHandler: content is not in aiResponse.message'
            );
        }

        res.status(200).send({
            response: aiResponse.message.content,
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

export { translateContentHandler };
