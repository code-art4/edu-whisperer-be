import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import { generateToken } from "../config/auth";
import { ObjectId } from 'mongodb';
import { createUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    createUser({ user: { name, email, password }, res });
};

export const loginWithEmail = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.password) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        res.json({ user, token: generateToken(user._id as ObjectId) });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
