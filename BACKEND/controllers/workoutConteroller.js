const Workout = require("../models/workoutModels");
const mongoose = require("mongoose");
//get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workout = await Workout.find({user_id }).sort({ createdAt: -1 });
  res.status(200).json(workout);
};

//get single workouts

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      msg: "No sush doc",
    });
  } else {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ err: "No Such Workout" });
    }
    res.status(200).json(workout);
  }
};

//create a new  workouts

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = []
  if(!title){
    emptyFields.push("title")
  }
  if(!load){
    emptyFields.push("load")
  }
  if(!reps){
    emptyFields.push("reps")
  }
  if(emptyFields.length > 0){
    return res.status(400).json({err : `please fill in all the fields`,emptyFields})
  }
  // add doc to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, load, reps,user_id });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//DELETE workouts
const deletWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      msg: "No sush doc",
    });
  } else {
    const workout = await Workout.findByIdAndDelete({ _id: id });
    if (!workout) {
      return res.status(400).json({ err: "No such doc" });
    } else {
      res.status(200).json(workout);
    }
  }
};

//UPDATE workouts
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      msg: "No sush doc",
    });
  } else {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!workout) {
      return res.status(400).json({ err: "No such doc" });
    } else {
      res.status(200).json(workout);
    }
  }
};

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deletWorkout,
  updateWorkout,
};
