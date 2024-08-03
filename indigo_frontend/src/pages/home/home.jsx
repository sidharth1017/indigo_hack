import React, { useState } from "react";
import { getFlightStatus } from "../../apiService/api";
import style from "./home.css";

const Home = () => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  const [departing, setDeparting] = useState("");
  const [arrival, setArrival] = useState("");
  const [flightDate, setFlightDate] = useState(todayDate);
  const [flightId, setFlightId] = useState("");
  const [pnr, setPnr] = useState("");
  const [flightStatus, setFlightStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchFlight = async () => {
    try {
      const flightDetails = { departing, arrival, flightDate, flightId, pnr };
      const response = await getFlightStatus(flightDetails);
      setFlightStatus(response);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
      setFlightStatus(null);
    }
  };

  return (
    <div className="home-section">
      <div className="container-home">
        <div className="header">
          <h1>Check Flight Status</h1>
          <p>
            With IndiGo's flight tracker, you can now track the live status of
            domestic and international flights. Just enter a few details such as
            PNR number, flight number, travel date and others and get the flight
            status on the go from anywhere.
          </p>
        </div>
        <div className="flightStatus">
          <p>Enter flight details to check your flight status.</p>
          <div className="flightDetail">
            <input
              type="text"
              placeholder="Departing"
              value={departing}
              onChange={(e) => setDeparting(e.target.value)}
            />
            <input
              type="text"
              placeholder="Arriving"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
            <input
              type="date"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
            />
          </div>
          <div className="flightDetailExtra">
            <input
              type="text"
              placeholder="6E-Flight"
              value={flightId}
              onChange={(e) => setFlightId(e.target.value)}
            />
            <input
              type="text"
              placeholder="PNR/Booking Ref."
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
            />
          </div>
          <button className="searchFlight" onClick={handleSearchFlight}>
            Search Flight
          </button>
          {error && <p className="error">{error}</p>}
          {flightStatus && (
            <div className="flight-status-result">
              <h2>Flight Status</h2>
              <p>{JSON.stringify(flightStatus, null, 2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
