import { Response, Request } from 'express';
import Session from '../models/session'
import { ResponseStatus, IResponse } from '../utils/response'

export const createSession = async (req: Request, res: Response) => {
    const { title, startDate, endDate } = req.body;

    try {
        const InvalidInputResponse: IResponse = {
            statusCode: 500,
            status: "failed",
            message: "All fields are required",
            res
        }

        if (!title || !startDate || !endDate) ResponseStatus(InvalidInputResponse);


        const session = await Session.create({ title, startDate, endDate });

        const EmptySessionResponse: IResponse = {
            statusCode: 500,
            status: "failed",
            message: "An issue occurred while trying to create session",
            res
        }

        if (!session) ResponseStatus(EmptySessionResponse)

        const SessionResponse: IResponse = {
            statusCode: 201,
            status: "success",
            message: "Successfully created session",
            res
        }

        ResponseStatus(SessionResponse)

    } catch (error) {
        const ErrorResponse: IResponse = {
            statusCode: 500,
            status: "failed",
            message: "An issue occurred while trying to create session",
            res
        }

        ResponseStatus(ErrorResponse)
    }
}

export const updateSession = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const session = await Session.findById(id);

        const EmptySessionResponse: IResponse = {
            statusCode: 500,
            status: "failed",
            message: "An issue occurred while trying to update session",
            res
        }

        if (!session) ResponseStatus(EmptySessionResponse)

        const SessionResponse: IResponse = {
            statusCode: 200,
            status: "success",
            message: "Successfully updated session",
            res
        }

        ResponseStatus(SessionResponse)

    } catch (error) {
        const ErrorResponse: IResponse = {
            statusCode: 500,
            status: "failed",
            message: "An issue occurred while trying to update session",
            res
        }

        ResponseStatus(ErrorResponse)
    }
}