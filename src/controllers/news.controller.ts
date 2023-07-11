import { RequestHandler } from 'express';
import {
    getMultipleNewsContent,
    getNewsContent,
    getWebUrls,
} from '../services/webCrawler.service';
import NewsContentResponse from '../models/news/newsContentResponse.model';
import NewsUrlsResponse from '../models/news/newsUrlResponse.model';
import axios from 'axios';

const getAllNewsURLsHandler: RequestHandler<
    {},
    NewsUrlsResponse,
    undefined,
    { u: string }
> = async (req, res) => {
    try {
        const MIN_NEWS = 100;
        const { u: url } = req.query;

        const results = await getWebUrls(url);

        let index = 0;

        while (results.length < MIN_NEWS) {
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

        const result = [await getNewsContent(url)];

        res.status(200).send({ result });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);

        res.status(500).send({ result: [], message: errorMessage });
    }
};

const getMultipleNewsContentHandler: RequestHandler<
    {},
    NewsContentResponse,
    undefined,
    { u: string }
> = async (req, res) => {
    try {
        const { u: inputRootURL } = req.query;

        const pendingURLs = await getWebUrls(inputRootURL);

        const contents = await getMultipleNewsContent(pendingURLs);

        res.status(200).send({ result: contents });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        res.status(500).send({ result: [], message });
    }
};

export {
    getAllNewsURLsHandler,
    getNewsContentHandler,
    getMultipleNewsContentHandler,
};
