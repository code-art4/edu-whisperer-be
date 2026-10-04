"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuiz = exports.createQuiz = void 0;
const quiz_1 = __importDefault(require("../models/quiz"));
const createQuiz = async (req, res) => {
    const { title, options } = req.body;
    try {
        if (!title)
            await quiz_1.default.create({ title, options });
    }
    catch (error) {
    }
};
exports.createQuiz = createQuiz;
const getQuiz = async () => {
    try {
        const quizes = await quiz_1.default.find();
    }
    catch (error) {
    }
};
exports.getQuiz = getQuiz;
