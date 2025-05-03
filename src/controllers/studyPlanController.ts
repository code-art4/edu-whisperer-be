import { Response, Request } from 'express';
import studyPlan from '../models/studyPlan'
import { ResponseStatus, IResponse } from '../utils/response'

const createStudyPlan = async (req: Request, res: Response) => {
    const { title, subject, startDate, endDate, studyGoal, category } = req.body

    if (!title || !subject || !startDate || !endDate || !studyGoal || !category) {
        const InvalidInputResponse: IResponse = {
            statusCode: 500,
            status: "failed",
            message: "All the fields are required",
            res
        }

        ResponseStatus(InvalidInputResponse);
    }

    try {
        const StudyPlan = await studyPlan.create(req.body)

        if (!StudyPlan) {
            const UncreatedStudyPlanResponse: IResponse = {
                statusCode: 500,
                status: "failed",
                message: "Failed to create Study Plan",
                res
            }

            ResponseStatus(UncreatedStudyPlanResponse);
        }

        const createdStudyPlanResponse: IResponse = {
            statusCode: 201,
            status: "success",
            message: "Successfully created Study Plan",
            res
        }

        ResponseStatus(createdStudyPlanResponse);

    } catch (error) {

        const errorResponse: IResponse = {
            statusCode: 500,
            error,
            status: "failed",
            message: "Successfully created Study Plan",
            res
        }

        ResponseStatus(errorResponse);
    }
}

module.exports = { createStudyPlan }