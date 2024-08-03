import React, { useState, useEffect } from "react";
import { searchTermApi, getFlightStatus } from "../../apiService/api";
import style from "./flightTracker.css";

const FlightTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [flightResults, setFlightResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [flightDetail, setFlightDetails] = useState({})

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFlightResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const fetchFlightNames = async () => {
      try {
        const response = await searchTermApi(searchTerm);
        setFlightResults(response || []);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching flight names:", error);
        setFlightResults([]);
      }
    };

    fetchFlightNames();
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = async (flightId) => {
    setSearchTerm(flightId);
    console.log(flightId, "flightId")
    const response = await getFlightStatus(flightId);
    setFlightDetails(response);
    console.log(flightDetail)
    setIsDropdownOpen(false);
  };

  return (
    <div className="search">
      <div className="searchConatiner">
        <h2>Search Your Flight</h2>
        <input
          className="searchBox"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter flight ID"
        />

        {isDropdownOpen &&
          Array.isArray(flightResults) &&
          flightResults.length > 0 && (
            <ul style={dropdownStyle}>
              {flightResults.map((flightId, index) => (
                <li
                  key={index}
                  onClick={() => handleResultClick(flightId)}
                  style={resultItemStyle}
                >
                  {flightId}
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

// Styling for the dropdown menu
const dropdownStyle = {
  border: "1px solid #ddd",
  borderRadius: "4px",
  maxHeight: "150px",
  overflowY: "auto",
  backgroundColor: "white",
  width: "100%",
  zIndex: 1000,
};

// Styling for each result item in the dropdown
const resultItemStyle = {
  padding: "8px",
  cursor: "pointer",
};

export default FlightTracker;
