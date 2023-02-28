import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { Exercise, createExercise } from './exercises_model.mjs';

const app = express();

const PORT = process.env.PORT;

app.use(express.json())


//  create a new exercise
app.post('/exercises', async (req, res) => {
    //create a new user using the schema and function from our model 
    let newExercise = await createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    //response status 201 and send back our new document. Similarly, set contentType
    // to application/json. contentType is by default application/json since we are returning json object
    res.contentType('application/json').status(201).send(newExercise)
})

// retrieve a user depending on information passed
app.get('/exercises', async (req, res) => {
    // object that will keep track of all the parameters passed.
    let query = {}

    let matches = await Exercise.find(query)
    res.status(200).send(matches)
})

app.get('/exercises/:_id', async (req, res) => {
    // object that will keep track of all the parameters passed.
    const exerciseId = req.params._id
    let exerciseMatch = await Exercise.findById(exerciseId)
    res.status(200).send(exerciseMatch)
})


app.put('/exercises/:_id', async (req, res) => {
    // object that will keep track of all the parameters passed.
    const exerciseId = req.params._id
    const filter = { name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date }
    let newRecord = await Exercise.findByIdAndUpdate(exerciseId, filter, { new: true })
    res.status(200).send(newRecord)
})

app.delete('/exercises/:_id', async (req, res) => {
    // object that will keep track of all the parameters passed.
    const exerciseId = req.params._id
    await Exercise.findByIdAndDelete(exerciseId)
    res.status(204).send()
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});