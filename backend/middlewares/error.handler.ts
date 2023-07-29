import { ErrorRequestHandler } from "express"
import ApiError from "../utils/ApiError";
import { error } from "console";
import mongoose from "mongoose";
import { INext, IRequest, IResponse } from "../types";
const ErrorHandler = (err: ErrorRequestHandler, req: IRequest, res: IResponse, next: INext) => {
    let error = err as any;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? 400 : 500;

        // set a message from native Error instance or a custom one
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error?.errors || []);
    }


    // Now we are sure that the `error` variable will be an instance of ApiError class
    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
    };

    // Send error response
    return res.status(error.statusCode).json(response);
}

export default ErrorHandler;