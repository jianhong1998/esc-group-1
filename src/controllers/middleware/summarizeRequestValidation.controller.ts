import { RequestHandler } from 'express';
import { SummarizeMultipleNewsRequest } from '../../models/summarise/summarizeRequest.model';
import SummarizeMultipleNewsResponse from '../../models/summarise/summarizeResponse.model';

const summarizeRequestValidationMiddleware =
    (): RequestHandler<
        {},
        SummarizeMultipleNewsResponse,
        SummarizeMultipleNewsRequest
    > =>
    (req, res, next) => {
        if (!('baseURL' in req.body)) {
            return res.status(400).send({
                response: [],
                message: 'baseURL is not in request body',
                success: false,
            });
        }

        const { u: inputURL } = req.body;

        if (typeof inputURL !== 'string') {
            throw new Error(
                'Must include URL as "u" in request query. For example: "/u=www.sample-web-page.com"'
            );
        }

        let baseURL: string;

        if (inputURL.includes('https://') || inputURL.includes('http://')) {
            baseURL = inputURL;
        } else {
            baseURL = `https://${inputURL}`;
        }

        req.body.u = baseURL;

        next();
    };

export { summarizeRequestValidationMiddleware };
