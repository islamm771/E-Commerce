
export interface IAxiosError {
    data: unknown;
    error: {
        message: string;
        status: number;
    }
}