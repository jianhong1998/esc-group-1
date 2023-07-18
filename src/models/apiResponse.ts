export default interface API_Response<T> {
    response?: T;
    errorMessage: string;
    success: boolean;
}
