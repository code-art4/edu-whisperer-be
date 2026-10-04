"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSession = exports.createSession = void 0;
const session_1 = __importDefault(require("../models/session"));
const response_1 = require("../utils/response");
const createSession = async (req, res) => {
    const { title, startDate, endDate } = req.body;
    try {
        const InvalidInputResponse = {
            statusCode: 500,
            status: "failed",
            message: "All fields are required",
            res
        };
        if (!title || !startDate || !endDate)
            (0, response_1.ResponseStatus)(InvalidInputResponse);
        const session = await session_1.default.create({ title, startDate, endDate });
        const EmptySessionResponse = {
            statusCode: 500,
            status: "failed",
            message: "An issue occurred while trying to create session",
            res
        };
        if (!session)
            (0, response_1.ResponseStatus)(EmptySessionResponse);
        const SessionResponse = {
            statusCode: 201,
            status: "success",
            message: "Successfully created session",
            res
        };
        (0, response_1.ResponseStatus)(SessionResponse);
    }
    catch (error) {
        const ErrorResponse = {
            statusCode: 500,
            status: "failed",
            message: "An issue occurred while trying to create session",
            res
        };
        (0, response_1.ResponseStatus)(ErrorResponse);
    }
};
exports.createSession = createSession;
const updateSession = async (req, res) => {
    const { id } = req.params;
    try {
        const session = await session_1.default.findById(id);
        const EmptySessionResponse = {
            statusCode: 500,
            status: "failed",
            message: "An issue occurred while trying to update session",
            res
        };
        if (!session)
            (0, response_1.ResponseStatus)(EmptySessionResponse);
        const SessionResponse = {
            statusCode: 200,
            status: "success",
            message: "Successfully updated session",
            res
        };
        (0, response_1.ResponseStatus)(SessionResponse);
    }
    catch (error) {
        const ErrorResponse = {
            statusCode: 500,
            status: "failed",
            message: "An issue occurred while trying to update session",
            res
        };
        (0, response_1.ResponseStatus)(ErrorResponse);
    }
};
exports.updateSession = updateSession;
