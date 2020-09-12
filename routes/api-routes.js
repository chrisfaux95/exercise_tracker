const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    console.log("GET WORKOUTS")
    db.Workout.find({}).sort({
        date: -1
    }).then(dbExercise => {
        // I DON'T KNOW WHAT'S HAPPENING HERE.
        // USING THE RESULT SENDS AN ERROR
        // THE FOLLOWING LINE BREAKS IT
        // let s = JSON.stringify(dbExercise);
        console.log(dbExercise);
        // console.log(s);
        res.json(dbExercise);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


router.get("/api/workouts/range", (req, res) => {
    let timeRange = new Date().setDate(new Date().getDate() - 10);
    db.Workout.find({
        date: { $lte: timeRange }
    }).then(dbExercise => {
        // console.log(dbExercise);
        res.json(dbExercise);
    }).catch(err => {
        res.status(400).json(err)
    })
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then(dbExercise => {
        res.json(dbExercise);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    let arr;
    db.Workout.findOneAndUpdate(
        { id: req.params.id },
        { $push: { exercises: req.body } }
    ).then((dbExercise) => {
        res.json(dbExercise);
    }).catch(err => {
        res.status(400).json(err);
    })
})


router.delete("/api/workouts", (req, res) => {
    db.Workout.deleteOne({});
});


module.exports = router;
