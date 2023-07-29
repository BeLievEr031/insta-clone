class ApiError extends Error {
    statusCode: number;
    message: string;
    error: any;
    public constructor(statusCode: number, message: string, error?: any) {
        super(message)
        this.statusCode = statusCode;
        this.message = message;
        this.error = error
    }

}

export default ApiError;