import { Request, Response } from 'express'
import quiz from '../models/quiz'

export const createQuiz = async (req: Request, res: Response) => {
    const { title, options } = req.body

    try {
        if (!title)
            await quiz.create({ title, options })
    } catch (error) {

    }
}

export const getQuiz = async () => {
    try {
        const quizes = await quiz.find();



    } catch (error) {

    }
}