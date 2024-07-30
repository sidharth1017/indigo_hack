import React from "react";
import style from "./home.css";

const home = () => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
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
            <input type="text" placeholder="Departing" />
            <input type="text" placeholder="Arriving" />
            <input type="date" value={todayDate} />
          </div>
          <div className="flightDetailExtra">
            <input type="text" placeholder="6E-Flight" />
            <input type="text" placeholder="PNR/Booking Ref." />
          </div>
          <button className="searchFlight">Search Flight</button>
        </div>
      </div>
    </div>
  );
};

export default home;
