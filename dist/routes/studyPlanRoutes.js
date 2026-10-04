"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studyPlanController_1 = require("../controllers/studyPlanController");
const router = express_1.default.Router();
router.get('/', studyPlanController_1.getStudyPlans);
router.post('/create', studyPlanController_1.createStudyPlan);
router.get('/studyPlan/:id', studyPlanController_1.getStudyPlan);
router.put('/studyPlan/update/:id', studyPlanController_1.updateStudyPlan);
module.exports = router;
