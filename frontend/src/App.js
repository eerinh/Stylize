import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/account/Login';
import Signup from './components/account/Signup';
import Following from './components/browsing/following';
import Landing from './components/landing/Landing';
import reportWebVitals from './reportWebVitals';
import Share from './components/share/Share';
import Help from './components/help/Help';
import AboutUs from './components/aboutus/Aboutus';
import Profile from './components/profile/Profile';
import Boards from './components/boards/Boards';
import SizeChart from './components/sizechart/SizeChart';
import API from './components/browsing/API';
import { ImageProvider } from './components/browsing/imageContext';  // Import the context
import Navbar from './components/navbar/Navbar'
//import { useAuth } from './useAuth';
//import UserProfile from '/UserProfile'; //23.10.23 6:01 pm added
import ProtectedRoute from './components/profile/ProtectedRoute';
//import { UserProvider } from './UserContext';
import  UserProfile from './components/profile/UserProfile';

function App() {
  return (
    <ImageProvider> {/* Wrap the entire app inside the Provider */}
    <div className="App">
      <Routes>
      
        <Route path="/" element={<Landing />} />
        <Route path="/following" element={<Following />} />
        <Route path="/share" element={<Share />} />
        <Route path="/help" element={<Help />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/sizechart" element={<SizeChart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/api" element={<API />} />


      
      </Routes>
    </div>
    </ImageProvider>
  );
}

export default App;
