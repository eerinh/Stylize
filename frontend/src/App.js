import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/account/Login';
import Signup from './components/account/Signup';
import Following from './components/browsing/API';
import Landing from './components/landing/Landing';
import reportWebVitals from './reportWebVitals';
import Share from './components/share/Share';
import Help from './components/help/Help';
import AboutUs from './components/aboutus/Aboutus';
import Profile from './components/profile/Profile';
import Boards from './components/boards/Boards';
import SizeChart from './components/sizechart/SizeChart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/following" element={<Following />} />
        <Route path="/share" element={<Share />} />
        <Route path="/help" element={<Help />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/sizechart" element={<SizeChart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>
  );
}

export default App;
