import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Navigation from './components/navigation/navigation';

function App() {
  return (
    <BrowserRouter>
    <Navigation /> 
      <Routes >
        <Route path="/" element={<Home/>} exact />
      </Routes >
      {/* <Footer /> */}
  </BrowserRouter>

  );
}

export default App;
