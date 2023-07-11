import { RequestHandler } from 'express';
import { getWebUrls } from '../services/webCrawler.service';

const getAllNewsURLs: RequestHandler<
    {},
    { result: string[]; message?: string },
    { u: string }
> = async (req, res) => {
    try {
        const { u: inputURL } = req.query;

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

        const results = await getWebUrls(baseURL);

        let index = 0;

        while (results.length < 100) {
            results.push(...(await getWebUrls(results[index])));

            index++;
        }

        res.status(200).send({ result: results });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        res.status(500).send({ result: [], message });
    }
};

export { getAllNewsURLs };
