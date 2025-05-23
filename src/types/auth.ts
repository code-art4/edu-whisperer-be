import { Response } from 'express'
import { ObjectId } from 'mongodb';

export interface IisPasswordValid {
    (password: string): boolean
}

export interface IUser {
    _id?: ObjectId,
    name: string,
    email: string,
    password: string
}

export interface IUserService {
    user: IUser
    res: Response
}

export interface ApiError {
    type: "VALIDATION_ERROR" | "UNAUTHORIZED" | "NOT_FOUND" | string;
    details?: any;
}

export interface ApiResponseParams {
    res: Response;
    message: string;
    status?: "success" | "error";
    statusCode?: number;
    data?: any;
    error?: ApiError | null;
    metadata?: any;
    token?: { access_token: any; expires_in: number };
    returnToken?: boolean
}

export interface IisUserInputValid {
    ({ name, email, password }: IUser): boolean
}