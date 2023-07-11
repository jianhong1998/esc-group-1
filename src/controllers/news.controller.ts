import { RequestHandler } from 'express';
import { getNewsContent, getWebUrls } from '../services/webCrawler.service';
import NewsContentResponse from '../models/news/newsContentResponse.model';
import NewsUrlsResponse from '../models/news/newsUrlResponse.model';

const getAllNewsURLsHandler: RequestHandler<
    {},
    NewsUrlsResponse,
    undefined,
    { u: string }
> = async (req, res) => {
    try {
        const { u: url } = req.query;

        const results = await getWebUrls(url);

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

const getNewsContentHandler: RequestHandler<
    {},
    NewsContentResponse,
    undefined,
    { u: string }
> = async (req, res) => {
    try {
        const { u: url } = req.query;

        const result = await getNewsContent(url);

        res.status(200).send({ result });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);

        res.status(500).send({ result: '', message: errorMessage });
    }
};

export { getAllNewsURLsHandler, getNewsContentHandler };
