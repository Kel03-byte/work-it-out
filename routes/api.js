const router = require('express').Router();
const db = require("../models");

// Find all Workouts
router.get("/api/workouts", async (request, response) => {
    try {
        const workoutData = await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    },
                },
            },
        ]);
        response.json(workoutData);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

// Find Workouts by Range
router.get('/api/workouts/range', async (request, response) => {
    try {
        const workoutData = await db.Workout.aggregate([
          {
            $addFields: {
              totalDuration: {
                $sum: '$exercises.duration' 
              },
              totalWeight: {
                $sum: '$exercises.weight'
              }
            },
          },
        ])
          .limit(7);
        response.json(workoutData);
      } catch (error) {
        response.status(500).send(error.message);
      }
    });

// Update a Workout using Id
router.put('/api/workouts/:id', async (request, response) => {
    try {
        const workoutData = await db.Workout.findByIdAndUpdate({ _id: request.params.id }, { $push: { exercises: request.body } })
        response.json(workoutData)
    } catch (error) {
        response.status(500).json(error.message);
    }
});

// Create a new Workout
router.post('/api/workouts', async ({ body }, response) => {
    try {
        const workoutData = await db.Workout.create(body);
        response.json(workoutData);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

module.exports = router;