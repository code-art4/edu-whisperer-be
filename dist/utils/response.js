"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.ResponseStatus = void 0;
const ResponseStatus = ({ res, message, data, status = "success", statusCode = 200, error }) => {
    if (status === "failed") {
        res.status(statusCode).json({
            status: status,
            message: message,
            error
        });
    }
    res.status(statusCode).json({
        status: status,
        message: message,
        data
    });
};
exports.ResponseStatus = ResponseStatus;
const ApiResponse = ({ res, message, status = "success", statusCode = status === "success" ? 200 : 400, data = null, error = null, metadata = null, token, returnToken }) => {
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
            : { error }) : { token }),
    });
};
exports.ApiResponse = ApiResponse;
