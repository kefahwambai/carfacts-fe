import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import VehicleList from './components/Vehicle/VehicleList';
import VehicleDetail from './components/Vehicle/VehicleDetail';
import Login from './components/Login/login';
import Signup from './components/Signup/Signup';
import Admin from './components/Admin/Admin';
import OurService from './components/OurService/OurService';
import Pricing from './components/Pricing/Pricing';
import Business from './components/Buisness/Buisness';
import Resources from './components/Resources/Resources';
import Footer from './components/Footer/Footer';
import api, { setAuthToken } from './services/api';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  const handleSearch = (query) => {
    api.get(`/vehicles?search=${query}`)
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error('Error fetching vehicles:', error));
  };

  useEffect(() => {
    api.get('/vehicles')
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error('Error fetching vehicles:', error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      api.get('/me')
        .then((response) => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  const RequireAuth = ({ children }) => {
    let location = useLocation();

    if (!user) {
      return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
  };

  return (
    <Router>
      <div className="app">
        <Header user={user} />
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
          <Route path="/vehicles/:id" element={

          // <RequireAuth>
            <VehicleDetail />
          // {/* </RequireAuth> */}
        }
         />
          <Route path="/vehicles" element={<VehicleList vehicles={vehicles} />} />
          <Route path="/services" element={<OurService />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/business" element={<Business />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/" element={<Navigate to="/vehicles" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
