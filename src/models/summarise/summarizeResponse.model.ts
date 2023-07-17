export interface SummarizedNews {
    content: string;
    url: string;
}

export default interface SummarizeMultipleNewsResponse {
    response: SummarizedNews[];
    message: string;
    success: boolean;
}
