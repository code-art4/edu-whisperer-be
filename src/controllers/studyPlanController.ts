import { Response, Request } from 'express';
import studyPlan from '../models/studyPlan'
import { ResponseStatus, IResponse } from '../utils/response'

export const createStudyPlan = async (req: Request, res: Response) => {
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

export const getStudyPlans = async (req: Request, res: Response) => {
    try {
        const StudyPlans = await studyPlan.find();

        if (!StudyPlans) {
            const noStudyPlanResponse: IResponse = {
                statusCode: 500,
                status: "failed",
                message: "An error occurred while trying to load study plans",
                res
            }

            ResponseStatus(noStudyPlanResponse)
        }

        const studyPlanResponse: IResponse = {
            statusCode: 200,
            status: "success",
            message: "Successfully fetched study plans",
            data: StudyPlans,
            res
        }

        ResponseStatus(studyPlanResponse);

    } catch (error) {
        const errorResponse: IResponse = {
            statusCode: 500,
            status: "failed",
            message: "An error occurred while trying to load study plans",
            res
        }

        ResponseStatus(errorResponse);
    }
}

export const getStudyPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const StudyPlans = await studyPlan.findById(id);

        if (!StudyPlans) {
            const noStudyPlanResponse: IResponse = {
                statusCode: 500,
                status: "failed",
                message: "An error occurred while trying to load study plan",
                res
            }

            ResponseStatus(noStudyPlanResponse)
        }

        const studyPlanResponse: IResponse = {
            statusCode: 200,
            status: "success",
            message: "Successfully fetched study plan",
            data: StudyPlans,
            res
        }

        ResponseStatus(studyPlanResponse);

    } catch (error) {
        const errorResponse: IResponse = {
            statusCode: 500,
            status: "failed",
            message: "An error occurred while trying to load study plan",
            res
        }

        ResponseStatus(errorResponse);
    }
}

export const updateStudyPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const StudyPlans = await studyPlan.findByIdAndUpdate(id);

        if (!StudyPlans) {
            const noStudyPlanResponse: IResponse = {
                statusCode: 500,
                status: "failed",
                message: "An error occurred while trying to update study plan",
                res
            }

            ResponseStatus(noStudyPlanResponse)
        }

        const studyPlanResponse: IResponse = {
            statusCode: 200,
            status: "success",
            message: "Successfully updated study plan",
            data: StudyPlans,
            res
        }

        ResponseStatus(studyPlanResponse);

    } catch (error) {
        const errorResponse: IResponse = {
            statusCode: 500,
            status: "failed",
            message: "An error occurred while trying to update study plan",
            res
        }

        ResponseStatus(errorResponse);
    }
}

module.exports = { createStudyPlan, getStudyPlans, getStudyPlan, updateStudyPlan }