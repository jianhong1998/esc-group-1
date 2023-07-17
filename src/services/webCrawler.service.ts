import { Element } from 'cheerio';
import WebCrawlerModel from '../models/webCrawler.model';
import { MAX_PAGE } from '../constants/webCrawler';
import NewsContent from '../models/news/newsContent.model';

const getWebUrls = async (baseURL: string): Promise<string[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const pendingURLs: string[] = [baseURL];
            const visitedURLs: string[] = [];
            const resultURLs: string[] = [];

            const rootURL = `https://${baseURL.split('/')[2]}`;

            while (pendingURLs.length > 0 && resultURLs.length < MAX_PAGE) {
                const url = pendingURLs.pop()!;

                const cheerioAPI = await WebCrawlerModel.getCheerioAPI(url);

                visitedURLs.push(url);

                cheerioAPI('a:not(:has(img))').each((_, element) => {
                    if (resultURLs.length >= MAX_PAGE) {
                        return;
                    }

                    const paginationURL = cheerioAPI(element).attr('href');

                    const splitedPaginationURL =
                        paginationURL?.split('/') || [];

                    if (
                        typeof paginationURL !== 'undefined' &&
                        paginationURL.charAt(0) === '/' &&
                        !visitedURLs.includes(paginationURL) &&
                        !pendingURLs.includes(paginationURL) &&
                        splitedPaginationURL.length > 2 &&
                        paginationURL.length > 24
                    ) {
                        // pendingURLs.push(paginationURL);
                        resultURLs.push(`${rootURL}${paginationURL}`);
                    }
                });
            }

            resolve(resultURLs);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : String(error);

            reject(message);
        }
    });
};

const getNewsContent = async (baseURL: string): Promise<NewsContent> => {
    return new Promise(async (resolve, reject) => {
        try {
            const querySelector = '.content-wrapper .text .text-long p';

            const cheerioAPI = await WebCrawlerModel.getCheerioAPI(baseURL);

            let resultText: string = '';

            cheerioAPI(querySelector).each((index, element) => {
                const nodes = element.childNodes;

                nodes.forEach((node) => {
                    if (
                        'data' in node &&
                        typeof node.data === 'string' &&
                        node.data !== null &&
                        node.data.trim().length > 0
                    ) {
                        resultText += node.data.trim();
                    }
                });
            });

            resolve({ content: resultText, url: baseURL });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);

            reject(errorMessage);
        }
    });
};

const getMultipleNewsContent = async (
    baseURLs: string[]
): Promise<NewsContent[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const resultContents = [] as NewsContent[];

            for (let baseURL of baseURLs) {
                const newsContent = await getNewsContent(baseURL);

                if (newsContent.content.length > 0) {
                    resultContents.push(newsContent);
                }
            }

            resolve(resultContents);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : String(error);

            reject(message);
        }
    });
};

export { getWebUrls, getNewsContent, getMultipleNewsContent };
