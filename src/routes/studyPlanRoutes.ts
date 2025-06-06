import express from 'express';
import { createStudyPlan, getStudyPlan, getStudyPlans, updateStudyPlan } from '../controllers/studyPlanController'

const router = express.Router()

router.get('/', getStudyPlans);
router.post('/create', createStudyPlan);
router.get('/studyPlan/:id', getStudyPlan);
router.put('/studyPlan/update/:id', updateStudyPlan);

module.exports = router