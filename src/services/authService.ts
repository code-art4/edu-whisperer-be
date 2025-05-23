import UserModel from '../models/user'
import { isPasswordValid, IsUserInputValid } from '../utils/auth';
import { ApiResponseParams, IUserService } from '../types/auth';
import { ApiResponse } from '../utils/response'
import { generateToken } from '../config/auth';
import { ObjectId } from 'mongodb';

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

    const userCreatedResponse: ApiResponseParams = {
        res,
        status: "error",
        statusCode: 201,
        message: "Your account has been created successfully!",
        token: {
            access_token: generateToken(user?._id as ObjectId),
            expires_in: 3600
        }
    };

    // Validate required fields (name, email, password)
    if (!IsUserInputValid(user)) ApiResponse(invalidInputResponse);

    // Validate password meets complexity requirements
    if (!isPasswordValid(password)) ApiResponse(invalidPasswordResponse);

    // Check if email already exists in database
    const confirmIfUserExists = await UserModel.findOne({ email });

    if (confirmIfUserExists) ApiResponse(userCreatedResponse);

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