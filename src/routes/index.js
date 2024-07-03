const express  = require('express');

const app = express();
const port = 2000
const surveyRouter = require('./routes')


app.use(express.json())


app.use("/ap1/v1", surveyRouter)

app.listen(port, () => {
    console.log("Listening to port")
})

