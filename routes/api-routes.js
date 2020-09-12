const router = require("express").Router();
const Exercise = require("../models/exerciseModel.js");

router.post("/workouts", (req, res) => {
    Exercise.create(req.body).then(dbExercise => {
        res.json(dbExercise);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.get("/workouts", (req, res) => {
    Exercise.find({}).sort({ date: -1 }).then(dbExercise => {
        res.json(dbExercise);
    }).catch(err => {
        res.status(400).json(err)
    });
});

router.post("/workouts", (req, res) => {
    Exercise.create(req.body).then(dbExercise => {
        res.json(dbExercise);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.post