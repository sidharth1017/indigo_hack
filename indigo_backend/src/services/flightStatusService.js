const flightSchema = require("../models/flightsSchema");

class FlightStatusService {
  async getFlightStatus(req, res) {
    try {
      const { departing, arrival, flightDate, flightId, pnr } = req.body;

      // if ((!departing && !arrival && !flightDate) || !flightId) {
      //   return res.status(400).json({ message: "Enter any one of the flight details" });
      // }

      let query = {};

      if (flightId) {
        query.flight_id = flightId;
      } else {
        if (departing) {
          query['departure.city'] = departing;
        }
        if (arrival) {
          query['arrival.city'] = arrival;
        }
        if (flightDate) {
          query.$or = [
            { 'departure.scheduled_departure': { $eq: new Date(flightDate) } },
            { 'arrival.scheduled_arrival': { $eq: new Date(flightDate) } }
          ];
        }
      }

      const flight = await flightSchema.findOne(query);

      if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
      }

      return res.status(200).json(flight);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!!" });
    }
  }

  async addFlight(req, res) {
    try {
      const {
        flight_id,
        airline,
        status,
        departure,
        arrival
      } = req.body;

      if (!flight_id || !status || !departure || !arrival) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Create a new flight document
      const newFlight = new flightSchema({
        flight_id,
        airline: airline || "Indigo",
        status,
        departure,
        arrival
      });

      // Save the flight to the database
      const savedFlight = await newFlight.save();

      return res.status(201).json(savedFlight);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong while adding the flight" });
    }
  }

  async getFlightNames(req, res) {
    try {
      const { flightId } = req.body;
  
      if (!flightId) {
        return res.status(400).json({ message: "Flight ID is required" });
      }
  
      const pattern = new RegExp(flightId, 'i'); 
  
      const flights = await flightSchema.find({
        flight_id: { $regex: pattern }
      }).select('flight_id -_id');
  
      if (flights.length === 0) {
        return res.status(404).json({ message: "No flights found" });
      }
  
      const flightIds = flights.map(flight => flight.flight_id);
  
      return res.status(200).json(flightIds);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!!" });
    }
  }
  

}

module.exports = new FlightStatusService();
