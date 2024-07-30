const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flight_id: { type: String, required: true, unique: true, index: true },
  airline: { type: String, required: true, default: "Indigo"},
  status: { type: String, required: true },
  departure: {
    city: { type: String, required: true },
    terminal: { type: String, required: true },
    gate: { type: String },
    scheduled_departure: { type: Date, required: true },
    actual_departure: { type: Date },
  },
  arrival: {
    city: { type: String, required: true },
    terminal: { type: String, required: true },
    gate: { type: String },
    scheduled_arrival: { type: Date, required: true },
    actual_arrival: { type: Date },
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Flights', flightSchema, 'flights');
