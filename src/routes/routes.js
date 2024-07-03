const express = require('express')

const SurveyController = require('../controllers/surveyControllers');
const router = express.Router();

const port = 3000;

router.post("/createSurvey", SurveyController.creatSurvey.bind(SurveyController))
router.get("/getSurveyById:id", SurveyController.getSurveyById.bind(SurveyController))
router.get("/getAllSurvey", SurveyController.getAllSurvey.bind(SurveyController))
router.delete("/delteSurveys:id", SurveyController.delteSurveys.bind(SurveyController))
router.put("/updateSurvey:id", SurveyController.updateSurvey.bind(SurveyController))


module.exports = router