"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudyPlan = exports.getStudyPlan = exports.getStudyPlans = exports.createStudyPlan = void 0;
const studyPlan_1 = __importDefault(require("../models/studyPlan"));
const response_1 = require("../utils/response");
const utils_1 = require("./../utils");
const createStudyPlan = async (req, res) => {
    const { title, subject, startDate, endDate, studyGoal, category } = req.body;
    if (!title || !subject || !startDate || !endDate || !studyGoal || !category) {
        const InvalidInputResponse = {
            statusCode: 500,
            status: "failed",
            message: "All fields are required",
            res
        };
        (0, response_1.ResponseStatus)(InvalidInputResponse);
    }
    try {
        const StudyPlan = await studyPlan_1.default.create({ ...req.body, session: (0, utils_1.Session)() });
        if (!StudyPlan) {
            const UncreatedStudyPlanResponse = {
                statusCode: 500,
                status: "failed",
                message: "Failed to create Study Plan",
                res
            };
            (0, response_1.ResponseStatus)(UncreatedStudyPlanResponse);
        }
        const createdStudyPlanResponse = {
            statusCode: 201,
            status: "success",
            message: "Successfully created Study Plan",
            res
        };
        (0, response_1.ResponseStatus)(createdStudyPlanResponse);
    }
    catch (error) {
        const errorResponse = {
            statusCode: 500,
            error,
            status: "failed",
            message: "Successfully created Study Plan",
            res
        };
        (0, response_1.ResponseStatus)(errorResponse);
    }
};
exports.createStudyPlan = createStudyPlan;
const getStudyPlans = async (req, res) => {
    try {
        const StudyPlans = await studyPlan_1.default.find();
        if (!StudyPlans) {
            const noStudyPlanResponse = {
                statusCode: 500,
                status: "failed",
                message: "An error occurred while trying to load study plans",
                res
            };
            (0, response_1.ResponseStatus)(noStudyPlanResponse);
        }
        const studyPlanResponse = {
            statusCode: 200,
            status: "success",
            message: "Successfully fetched study plans",
            data: StudyPlans,
            res
        };
        (0, response_1.ResponseStatus)(studyPlanResponse);
    }
    catch (error) {
        const errorResponse = {
            statusCode: 500,
            status: "failed",
            message: "An error occurred while trying to load study plans",
            res
        };
        (0, response_1.ResponseStatus)(errorResponse);
    }
};
exports.getStudyPlans = getStudyPlans;
const getStudyPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const StudyPlans = await studyPlan_1.default.findById(id);
        if (!StudyPlans) {
            const noStudyPlanResponse = {
                statusCode: 500,
                status: "failed",
                message: "An error occurred while trying to load study plan",
                res
            };
            (0, response_1.ResponseStatus)(noStudyPlanResponse);
        }
        const studyPlanResponse = {
            statusCode: 200,
            status: "success",
            message: "Successfully fetched study plan",
            data: StudyPlans,
            res
        };
        (0, response_1.ResponseStatus)(studyPlanResponse);
    }
    catch (error) {
        const errorResponse = {
            statusCode: 500,
            status: "failed",
            message: "An error occurred while trying to load study plan",
            res
        };
        (0, response_1.ResponseStatus)(errorResponse);
    }
};
exports.getStudyPlan = getStudyPlan;
const updateStudyPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const StudyPlans = await studyPlan_1.default.findByIdAndUpdate(id);
        if (!StudyPlans) {
            const noStudyPlanResponse = {
                statusCode: 500,
                status: "failed",
                message: "An error occurred while trying to update study plan",
                res
            };
            (0, response_1.ResponseStatus)(noStudyPlanResponse);
        }
        const studyPlanResponse = {
            statusCode: 200,
            status: "success",
            message: "Successfully updated study plan",
            data: StudyPlans,
            res
        };
        (0, response_1.ResponseStatus)(studyPlanResponse);
    }
    catch (error) {
        const errorResponse = {
            statusCode: 500,
            status: "failed",
            message: "An error occurred while trying to update study plan",
            res
        };
        (0, response_1.ResponseStatus)(errorResponse);
    }
};
exports.updateStudyPlan = updateStudyPlan;
module.exports = { createStudyPlan: exports.createStudyPlan, getStudyPlans: exports.getStudyPlans, getStudyPlan: exports.getStudyPlan, updateStudyPlan: exports.updateStudyPlan };
