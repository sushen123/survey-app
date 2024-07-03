const { PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();

class SurveyController{

     async getAllSurvey(req,res) {
        try {
            const surveys = await prisma.survey.findMany();

            res.status(200).json(surveys)
        }
        catch(error) {
            res.status(500).json({message: error.message})
        } 
    }

    async getSurveyById(req,res) {
        const id = req.body.id
        try {
            const survey = await prisma.survey.findUnique({
                where: {
                    id: id
                }
            })
            if(survey==null) {
             return   res.status(404).json({message: "Survey Not found"})
            }
            res.status(200).json(survey)
        }
        catch(error) {
            res.status(200).json({message: error.message})
        }
    }

    async creatSurvey(req,res) {
        const surveyDetails = req.body
       try {
        const surveys = await prisma.survey.create({
            data: {
                title: surveyDetails.title,
                questions: {
                    create: surveyDetails.questions.map(question => ({
                        text: question.text,
                        options: {
                            create: question.options.map(option => ({
                                text: option.text
                            }))
                        }
                    }))
                }
            }
        });
        res.status(201).json(surveys)
       }
       catch(error) {
        res.status(400).json({message: error.message})
       }
    }


    async updateSurvey(req,res) {
        try{
           const updatedSurvey =  await prisma.survey.update({
            where: {
                id: req.params.id
            },
            data: req.body
           });
            res.status(200).json(updatedSurvey);
        }
        catch(error) {
        res.status(400).json({message: error.message })
    }
 }
    async delteSurveys(req,res) {
        try {
        await prisma.survey.delete({
            where: {
                id: req.body.id
            }
        });
        res.json(200).json({message: "Deleted Successfully"})
        }
        catch(error){
            res.json(400).json({message: error.message})
        }
    }
 }

 module.exports = new SurveyController()