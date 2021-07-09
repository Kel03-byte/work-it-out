const router = require('express').Router();
const { request } = require('express');
const Workout = require('../models/workout.js');

// Find all Workouts
router.get('/api/workouts', (request, response) => {
    try {
        Workout.find({})
            .then(data => response.json(data))
    } catch (error) {
        console.log(error.message)
    };
})


// Find Workouts by Range
router.get('/api/workouts/range', (request, response) => {
    try {
        Workout.find({})
            .then(data => response.json(data))
    } catch (error) {
        console.log(error.message)
    };
})

// Update a Workout using Id
router.put('/api/workouts/:id', (request, response) => {
    try {
        Workout.findByIdAndUpdate(request.params.id, request.body)
            .then(data => response.json(data))
    } catch (error) {
        response.status(500).json(error.message);
    }
})

// Create a new Workout
router.post('/api/workouts', ({ body }, response) => {
    Workout.create(body)
        .then((workoutData) => {
            response.json(workoutData);
        })
        .catch((error) => {
            response.status(500).json(error.message);
        });
});

module.exports = router;