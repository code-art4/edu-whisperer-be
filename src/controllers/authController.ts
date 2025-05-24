import { Request, Response } from "express";
import { createUser, authenticateUserWithEmail, authenticateGuest } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    createUser({ user: { name, email, password }, res });
};

export const loginWithEmail = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    authenticateUserWithEmail({ user: { email, password }, res })
};

export const loginAsGuest = async (req: Request, res: Response) => {
    authenticateGuest(res)
};

// requires card for the google oauth2 secret key
// export const loginWithGoogle = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     authenticateUserWithEmail({ user: { email, password }, res })
// };
