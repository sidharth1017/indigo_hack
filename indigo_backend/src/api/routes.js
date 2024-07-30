const router = require('express').Router();
const FlightStatusService = require('../services/flightStatusService');

// router.post('/admin/add/report', ReportController.upload);
// router.get("/reports", ReportController.getReports);

// Route flight Detail
router.post('/flight-status', FlightStatusService.getFlightStatus);
router.post('/add-flight', FlightStatusService.addFlight);

module.exports = router;