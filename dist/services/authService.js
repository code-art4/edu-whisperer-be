"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateGuest = exports.authenticateUserWithEmail = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const response_1 = require("../utils/response");
const auth_2 = require("../config/auth");
const createUser = async ({ user, res }) => {
    const { name, email, password } = user;
    // Response for missing/invalid required fields
    const invalidInputResponse = {
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
    const invalidPasswordResponse = {
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
    const userExistsResponse = {
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
    if (!(0, auth_1.IsUserInputValid)(user)) {
        return (0, response_1.ApiResponse)(invalidInputResponse);
    }
    ;
    // Validate password meets complexity requirements
    if (!(0, auth_1.isPasswordValid)(password)) {
        return (0, response_1.ApiResponse)(invalidPasswordResponse);
    }
    ;
    // Check if email already exists in database
    const confirmIfUserExists = await User_1.default.findOne({ email });
    if (confirmIfUserExists) {
        return (0, response_1.ApiResponse)(userExistsResponse);
    }
    ;
    // encrypt the password
    const salt = bcryptjs_1.default.genSaltSync(12);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    // Check if email already exists in database
    const userCreated = await User_1.default.create({ name, email, password: hash });
    const userCreatedResponse = {
        res,
        status: "success",
        statusCode: 201,
        message: "Your account has been created successfully!",
        returnToken: true,
        token: {
            access_token: (0, auth_2.generateToken)(userCreated?._id),
            expires_in: 3600
        }
    };
    if (userCreated) {
        return (0, response_1.ApiResponse)(userCreatedResponse);
    }
    ;
    (0, response_1.ApiResponse)({
        res,
        status: "error",
        statusCode: 500,
        message: "A server error occurred",
        error: {
            type: "INTERNAL_SERVER_ERROR"
        }
    });
};
exports.createUser = createUser;
const authenticateUserWithEmail = async ({ user, res }) => {
    const { email, password } = user;
    // Response for missing/invalid required fields
    const invalidInputResponse = {
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
    const passwordMismatchResponse = {
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
    const loginUser = true;
    if (!(0, auth_1.IsUserInputValid)(user, loginUser)) {
        return (0, response_1.ApiResponse)(invalidInputResponse);
    }
    ;
    // Check if email already exists in database
    const existingUser = await User_1.default.findOne({ email });
    const isMatch = await bcryptjs_1.default.compare(password, existingUser?.password || '');
    if (!isMatch)
        return (0, response_1.ApiResponse)(passwordMismatchResponse);
    const authenticatedUserResponse = {
        res,
        status: "success",
        statusCode: 200,
        message: "Login successful",
        returnToken: true,
        token: {
            access_token: (0, auth_2.generateToken)(existingUser?._id),
            expires_in: 3600
        }
    };
    if (existingUser && isMatch)
        return (0, response_1.ApiResponse)(authenticatedUserResponse);
    (0, response_1.ApiResponse)({
        res,
        status: "error",
        statusCode: 500,
        message: "A server error occurred",
        error: {
            type: "INTERNAL_SERVER_ERROR"
        }
    });
};
exports.authenticateUserWithEmail = authenticateUserWithEmail;
const authenticateGuest = async (res) => {
    // Check if email already exists in database
    const guestUser = await User_1.default.findOne({ email: process.env.GUEST_MAIL, isGuest: true });
    const authenticatedUserResponse = {
        res,
        status: "success",
        statusCode: 200,
        message: "Login successful",
        returnToken: true,
        token: {
            access_token: (0, auth_2.generateToken)(guestUser?._id),
            expires_in: 3600
        }
    };
    if (guestUser) {
        return (0, response_1.ApiResponse)(authenticatedUserResponse);
    }
    (0, response_1.ApiResponse)({
        res,
        status: "error",
        statusCode: 500,
        message: "A server error occurred",
        error: {
            type: "INTERNAL_SERVER_ERROR"
        }
    });
};
exports.authenticateGuest = authenticateGuest;
