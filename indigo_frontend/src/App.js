import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Navigation from './components/navigation/navigation';
import Login from './pages/login/login';
import FlightTracker from './pages/flightTracker/flightTracker';

function App() {
  return (
    <BrowserRouter>
    <Navigation /> 
      <Routes >
        <Route path="/" element={<Home/>} exact />
        <Route path='/login' element={<Login/>} exact />
        <Route path='/flight-tracker' element={<FlightTracker/>} exact />
      </Routes >
      {/* <Footer /> */}
  </BrowserRouter>

  );
}

export default App;
