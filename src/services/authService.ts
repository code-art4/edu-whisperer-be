import { Response } from 'express';
import { ObjectId } from 'mongodb';
import bcrypt from "bcryptjs";
import UserModel from '../models/user'
import { isPasswordValid, IsUserInputValid } from '../utils/auth';
import { ApiResponseParams, IUserService } from '../types/auth';
import { ApiResponse } from '../utils/response'
import { generateToken } from '../config/auth';

export const createUser = async ({ user, res }: IUserService) => {
    const { name, email, password } = user;

    // Response for missing/invalid required fields
    const invalidInputResponse: ApiResponseParams = {
        res,
        status: "error",
        statusCode: 422,
        message: "Required fields missing. Please provide: name, email, and password.",
        error: {
            type: "VALIDATION_ERROR",
            details: [
                { field: "name", requirement: "Must be a non-empty string" },
                { field: "email", requirement: "Must be a valid email address" },
                { field: "password", requirement: "Minimum 12 characters, at least 1 uppercase, special character, 1 number" }
            ]
        }
    };

    // Response for password policy violations
    const invalidPasswordResponse: ApiResponseParams = {
        res,
        status: "error",
        statusCode: 422,
        message: "Password must contain: 8+ characters, 1 number, and 1 special character",
        error: {
            type: "VALIDATION_ERROR",
            details: [
                {
                    field: "password",
                    requirement: [
                        "Is 12+ characters long",
                        "Has 1 uppercase letter",
                        "Has 1 number",
                        "Has 1 symbol (!@# etc.)"
                    ]
                }
            ]
        }
    };

    // Response when email already exists in system     
    const userExistsResponse: ApiResponseParams = {
        res,
        status: "error",
        statusCode: 409,
        message: "This email address is already registered",
        error: {
            type: "DUPLICATE_ENTRY",
            details: {
                field: "email",
            },
        }
    };

    // Validate required fields (name, email, password)
    if (!IsUserInputValid(user)) {
        return ApiResponse(invalidInputResponse)
    };

    // Validate password meets complexity requirements
    if (!isPasswordValid(password)) {
        return ApiResponse(invalidPasswordResponse)
    };

    // Check if email already exists in database
    const confirmIfUserExists = await UserModel.findOne({ email });

    if (confirmIfUserExists) {
        return ApiResponse(userExistsResponse)
    };

    // encrypt the password
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);

    // Check if email already exists in database
    const userCreated = await UserModel.create({ name, email, password: hash });

    const userCreatedResponse: ApiResponseParams = {
        res,
        status: "success",
        statusCode: 201,
        message: "Your account has been created successfully!",
        returnToken: true,
        token: {
            access_token: generateToken(userCreated?._id as ObjectId),
            expires_in: 3600
        }
    };

    if (userCreated) {
        return ApiResponse(userCreatedResponse)
    };

    ApiResponse({
        res,
        status: "error",
        statusCode: 500,
        message: "A server error occurred",
        error: {
            type: "INTERNAL_SERVER_ERROR"
        }
    });

};

export const authenticateUserWithEmail = async ({ user, res }: IUserService) => {
    const { email, password } = user;

    // Response for missing/invalid required fields
    const invalidInputResponse: ApiResponseParams = {
        res,
        status: "error",
        statusCode: 422,
        message: "Required fields missing. Please provide: email, and password.",
        error: {
            type: "VALIDATION_ERROR",
            details: [
                { field: "email" },
                { field: "password" }
            ]
        }
    };

    // Response for missing/invalid required fields
    const passwordMismatchResponse: ApiResponseParams = {
        res,
        status: "error",
        statusCode: 422,
        message: "Incorrect email or password. Please try again",
        error: {
            type: "VALIDATION_ERROR",
            details: [
                { field: "email" },
                { field: "password" }
            ]
        }
    };

    // Validate required fields (email, password)
    const loginUser = true

    if (!IsUserInputValid(user, loginUser)) {
        return ApiResponse(invalidInputResponse)
    };

    // Check if email already exists in database
    const existingUser = await UserModel.findOne({ email });

    const isMatch = await bcrypt.compare(password, existingUser?.password || '');
    if (!isMatch) return ApiResponse(passwordMismatchResponse)

    const authenticatedUserResponse: ApiResponseParams = {
        res,
        status: "success",
        statusCode: 200,
        message: "Login successful",
        returnToken: true,
        token: {
            access_token: generateToken(existingUser?._id as ObjectId),
            expires_in: 3600
        }
    };


    if (existingUser && isMatch) return ApiResponse(authenticatedUserResponse)

    ApiResponse({
        res,
        status: "error",
        statusCode: 500,
        message: "A server error occurred",
        error: {
            type: "INTERNAL_SERVER_ERROR"
        }
    });

};

export const authenticateGuest = async (res: Response) => {
    // Check if email already exists in database
    const guestUser = await UserModel.findOne({ email: process.env.GUEST_MAIL, isGuest: true });

    const authenticatedUserResponse: ApiResponseParams = {
        res,
        status: "success",
        statusCode: 200,
        message: "Login successful",
        returnToken: true,
        token: {
            access_token: generateToken(guestUser?._id as ObjectId),
            expires_in: 3600
        }
    };

    if (guestUser) {
        return ApiResponse(authenticatedUserResponse)
    }

    ApiResponse({
        res,
        status: "error",
        statusCode: 500,
        message: "A server error occurred",
        error: {
            type: "INTERNAL_SERVER_ERROR"
        }
    });

};