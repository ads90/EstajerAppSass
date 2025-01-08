export interface ApiResponse {
    isSucceeded: boolean;
    message: string;
    errorCode: number;
    data: any;
}