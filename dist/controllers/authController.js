"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAsGuest = exports.loginWithEmail = exports.register = void 0;
const authService_1 = require("../services/authService");
const register = async (req, res) => {
    const { name, email, password } = req.body;
    (0, authService_1.createUser)({ user: { name, email, password }, res });
};
exports.register = register;
const loginWithEmail = async (req, res) => {
    const { email, password } = req.body;
    (0, authService_1.authenticateUserWithEmail)({ user: { email, password }, res });
};
exports.loginWithEmail = loginWithEmail;
const loginAsGuest = async (req, res) => {
    (0, authService_1.authenticateGuest)(res);
};
exports.loginAsGuest = loginAsGuest;
// requires card for the google oauth2 secret key
// export const loginWithGoogle = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     authenticateUserWithEmail({ user: { email, password }, res })
// };
