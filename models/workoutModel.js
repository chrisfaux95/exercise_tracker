const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Exercise Type is Required"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Exercise Name is Required"
                },
                duration: {
                    type: Number,
                    required: "Duration is Required"
                },
                weight: Number,
                reps: Number,
                sets: Number,
                distance: Number
            }
        ]
    },
    { toJSON: { virtuals: true } }
);

workoutSchema.virtual('totalDuration').get(function () {
    return this.exercises.reduce(
        (total, exercise) => {
            return total + exercise.duration;
        }, 0);
})

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
