import WebCrawlerModel from '../models/webCrawler.model';

const getWebUrls = async (baseUrl: string): Promise<string[]> => {
    return new Promise(async (resolve, reject) => {
        const MAX_PAGE = 20;

        try {
            const pendingURLs: string[] = [baseUrl];
            const visitedURLs: string[] = [];
            const resultURLs: string[] = [];

            const rootURL = `https://${baseUrl.split('/')[2]}`;

            while (pendingURLs.length > 0 && visitedURLs.length < MAX_PAGE) {
                const url = pendingURLs.pop()!;

                const cheerioAPI = await WebCrawlerModel.getCheerioAPI(url);

                visitedURLs.push(url);

                cheerioAPI('a:not(:has(img))').each((_, element) => {
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

export { getWebUrls };
