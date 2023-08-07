export default interface AiResponse {
    index: number;
    message: {
        role: string;
        content: string;
    };
    finish_reason: string;
}
