import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import { generateToken } from "../config/auth";
import { ObjectId } from 'mongodb';
import { createUser, authenticateUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    createUser({ user: { name, email, password }, res });
};

export const loginWithEmail = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    authenticateUser({ user: { email, password }, res })
};
