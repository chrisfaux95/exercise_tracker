const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    console.log("GET WORKOUTS")
    db.Workout.find({}).sort({
        date: -1
    }).then(dbExercise => {
        res.json(dbExercise);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


router.get("/api/workouts/range", (req, res) => {
    let now = new Date();
    let timeRange = new Date().setDate(now.getDate() - 11)
    console.log(timeRange.toString());
    db.Workout.find({
        date: { $gte: timeRange }
    }).then(dbExercise => {
        console.log(dbExercise);
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
    db.Workout.findByIdAndDelete(req.body.id).then(
        () => { res.json(true) }
    ).catch(err => {
        res.status(400).json(err);
    })
});


module.exports = router;
