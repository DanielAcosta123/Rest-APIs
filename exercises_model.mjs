import mongoose from 'mongoose';
import 'dotenv/config';


mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

// schema that requires a name, reps, weight, unit, and date
const schema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
})

// create a database using our schema
const Exercise = mongoose.model('exercise', schema)

// function that will create a new exercise document based on the parameters passed. It will be used to create an exercise 
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name, reps, weight, unit, date })
    return exercise.save()
}

// export our database and our createExercise function.
export { Exercise, createExercise }


db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});