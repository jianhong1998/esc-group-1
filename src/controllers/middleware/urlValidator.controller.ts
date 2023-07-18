import { RequestHandler } from 'express';
import API_Response from '../../models/apiResponse';

const urlValidator =
    (): RequestHandler<any, API_Response<string>, undefined, { u: string }> =>
    (req, res, next) => {
        try {
            const { u: inputURL } = req.query;

            if (typeof inputURL !== 'string') {
                throw new Error(
                    "Must include URL as 'u' in request query. For example: '/?u=www.sample-web-page.com'"
                );
            }

            let baseURL: string;

            if (inputURL.includes('https://') || inputURL.includes('http://')) {
                baseURL = inputURL;
            } else {
                baseURL = `https://${inputURL}`;
            }

            req.query.u = baseURL;

            next();
        } catch (error) {
            const message =
                error instanceof Error ? error.message : String(error);

            res.status(400).send({ errorMessage: message, success: false });
        }
    };

export { urlValidator };
