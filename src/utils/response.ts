import { Response } from 'express';
import { Error } from 'mongoose';

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