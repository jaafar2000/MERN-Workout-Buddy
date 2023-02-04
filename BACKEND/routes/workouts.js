const express = require("express")
const { createWorkout,getWorkout,getWorkouts , deletWorkout , updateWorkout} = require('../controllers/workoutConteroller')
const requireAuth = require("../middleware/requireAuth")
const router = express.Router();

router.use(requireAuth)
//get all workouts
router.get('/' , getWorkouts)

// single workouts
router.get("/:id" ,getWorkout )

// post a new  workouts
router.post("/" ,  createWorkout )

// DELETE workouts 
router.delete("/:id" , deletWorkout )

// UPDATE workouts
router.patch("/:id" , updateWorkout )



module.exports = router;