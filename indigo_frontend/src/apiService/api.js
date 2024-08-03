import axios from "axios";

const API_URL = "http://localhost:5500"


export const loginUser = async (email, phone) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, phone });
    return response.data;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
};

export const verifyOtp = async (hash, otp, phone, email) => {
    try {
      const response = await axios.post(`${API_URL}/verify-user`, { hash, otp, phone, email });
      return response.data;
    } catch (error) {
      console.error("Error login user:", error);
      throw error;
    }
  };

  export const getFlightStatus = async (flightDetails) => {
    const { departing, arrival, flightDate, flightId, pnr } = flightDetails;
  
    try {
      const response = await axios.post(`${API_URL}/flight-status`, {
        departing,
        arrival,
        flightDate,
        flightId,
        pnr,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching flight status:", error);
      throw error;
    }
  };

  export const searchTermApi = async (searchTerm) => {
    try {
      const response = await axios.post(`${API_URL}/get-flight-names`, {flightId: searchTerm});
      return response.data;
    } catch (error) {
      console.error("Error login user:", error);
      throw error;
    }
  };