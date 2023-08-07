export default interface StandardResponse<T> {
    response?: T;
    message: string;
    success: boolean;
}
