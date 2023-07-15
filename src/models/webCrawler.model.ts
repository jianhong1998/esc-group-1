import axios from 'axios';
import { CheerioAPI, load } from 'cheerio';

export default class WebCrawlerModel {
    public static async getCheerioAPI(url: string): Promise<CheerioAPI> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data: pageHTML } = await axios.get(url);
                const cheerioAPI = load(pageHTML);

                resolve(cheerioAPI);
            } catch (error) {
                reject(error);
            }
        });
    }
}
