const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
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
    duration: Number,
    distance: Number,
    sets: Number,
    reps: Number,
    weight: Number

});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
