import NewsContent from './newsContent.model';

export default interface NewsContentResponse {
    result: NewsContent[];
    message?: string;
}
