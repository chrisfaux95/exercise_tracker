// References for the fitness tracker form inputs
const workoutTypeSelect = $("#type");

// CARDIO CONSTS
const cardioForm = $("#cardio-form");
const cardioNameInput = $("#cardio-name");
const cardioDurationInput = $("#cardio-duration");
const cardioDistanceInput = $("#cardio-distance");
// RESISTANCE CONSTS
const resistanceForm = $("#resistance-form");
const resistanceNameInput = $("#resistance-name");
const resistanceWeightInput = $("#resistance-weight");
const resistanceSetsInput = $("#resistance-sets");
const resistanceRepsInput = $("#resistance-reps");

const resistanceDurationInput = $("#resistance-duration");

const completeButton = $("button.complete");
const addButton = $("button.add-another");
const toast = $(".toast");
const newWorkout = $(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;

async function initExercise() {
    let workout;

    if (location.search.split("=")[1] === undefined) {
        workout = await API.createWorkout()
        console.log(workout)
    }
    if (workout) {
        location.search = "?id=" + workout._id;
    }

}

// initExercise();

function handleWorkoutTypeChange(event) {
    workoutType = event.target.value;

    if (workoutType === "cardio") {
        cardioForm.show();
        resistanceForm.hide();
    } else if (workoutType === "resistance") {
        resistanceForm.show();
        cardioForm.hide();
    } else {
        cardioForm.hide();
        resistanceForm.hide();
    }

    validateInputs();
}

function validateInputs() {
    let isValid = true;
    // Checks if any of the inputs are blank
    if (workoutType === "resistance") {
        if (resistanceNameInput.val().trim() === "") isValid = false;
        if (resistanceWeightInput.val().trim() === "") isValid = false;
        if (resistanceSetsInput.val().trim() === "") isValid = false;
        if (resistanceRepsInput.val().trim() === "") isValid = false;
        if (resistanceDurationInput.val().trim() === "") isValid = false;
    } else if (workoutType === "cardio") {
        if (cardioNameInput.val().trim() === "") isValid = false;
        if (cardioDurationInput.val().trim() === "") isValid = false;
        if (cardioDistanceInput.val().trim() === "") isValid = false;
    }

    // if none of them are blank, allow for button press
    if (isValid) {
        completeButton.removeAttr("disabled");
        addButton.removeAttr("disabled");
    } else {
        completeButton.attr("disabled", true);
        addButton.attr("disabled", true);
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();

    let workoutData = {};

    if (workoutType === "cardio") {
        workoutData.type = "cardio";
        workoutData.name = cardioNameInput.val().trim();
        workoutData.distance = Number(cardioDistanceInput.val().trim());
        workoutData.duration = Number(cardioDurationInput.val().trim());
    } else if (workoutType === "resistance") {
        workoutData.type = "resistance";
        workoutData.name = resistanceNameInput.val().trim();
        workoutData.weight = Number(resistanceWeightInput.val().trim());
        workoutData.sets = Number(resistanceSetsInput.val().trim());
        workoutData.reps = Number(resistanceRepsInput.val().trim());
        workoutData.duration = Number(resistanceDurationInput.val().trim());
    }

    await API.addExercise(workoutData);
    clearInputs();
    toast.addClass("success");
}

function handleToastAnimationEnd() {
    toast.removeClass("success");
    if (shouldNavigateAway) {
        location.href = "/";
    }
}

function clearInputs() {
    cardioNameInput.value = "";
    resistanceNameInput.value = "";
    resistanceSetsInput.value = "";
    cardioDistanceInput.value = "";
    cardioDurationInput.value = "";
    resistanceRepsInput.value = "";
    resistanceDurationInput.value = "";
    resistanceWeightInput.value = "";
}

if (workoutTypeSelect) {
    workoutTypeSelect.on("change", handleWorkoutTypeChange);
}
if (completeButton) {
    completeButton.on("click", function (event) {
        shouldNavigateAway = true;
        handleFormSubmit(event);
    });
}
if (addButton) {
    addButton.on("click", handleFormSubmit);
}
toast.on("click", handleToastAnimationEnd);
$(document).on("input", "input", validateInputs);