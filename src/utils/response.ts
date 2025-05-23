import { Response } from 'express';
import { Error } from 'mongoose';
import { ApiResponseParams } from '../types/auth';

export interface IResponse {
    res: Response
    message: String,
    // this type is any because it can return null, Object or array and it is optional in the case of an errorResponse where data isn't passed back
    data?: any,
    status: "success" | "failed",
    statusCode: number,
    error?: unknown
}

export const ResponseStatus = ({ res, message, data, status = "success", statusCode = 200, error }: IResponse) => {

    if (status === "failed") {
        res.status(statusCode).json({
            status: status,
            message: message,
            error
        })
    }

    res.status(statusCode).json({
        status: status,
        message: message,
        data
    })
}

export const ApiResponse = ({
    res,
    message,
    status = "success",
    statusCode = status === "success" ? 200 : 400,
    data = null,
    error = null,
    metadata = null,
    token,
    returnToken
}: ApiResponseParams) => {

    // Determine status code based on error type
    if (status === "error" && error?.type && !statusCode) {
        switch (error.type) {
            case "VALIDATION_ERROR":
                statusCode = 422;
                break;
            case "UNAUTHORIZED":
                statusCode = 401;
                break;
            case "NOT_FOUND":
                statusCode = 404;
                break;
            // Add more cases as needed
            default:
                statusCode = 400; // Bad Request as fallback
        }
    }

    return res.status(statusCode).json({
        status,
        statusCode,
        message,
        ...(!returnToken ? (status === "success"
            ? { data, ...(metadata && { metadata }) }
            : { error }) : { token }
        ),
    });
};