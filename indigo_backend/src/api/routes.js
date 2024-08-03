const router = require('express').Router();
const FlightStatusService = require('../services/flightStatusService');
const AuthService = require("../services/authService");


// Route flight Detail
router.post('/flight-status', FlightStatusService.getFlightStatus);
router.post('/add-flight', FlightStatusService.addFlight);

// Route Users 
router.post('/login', AuthService.userLogin);
router.post('/verify-user', AuthService.verifyUser);

module.exports = router;