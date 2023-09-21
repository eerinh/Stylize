import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Following from './components/browsing/following.js';
import reportWebVitals from './reportWebVitals';
import Landing from './components/landing/Landing.js';
import Share from './components/share/Share';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Help from './components/help/Help';
import AboutUs from './components/aboutus/Aboutus';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Following />} />
      <Route path="/following" element={<Following />} />
      <Route path="/share" element={<Share />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/help" element={<Help />} />
      {/* ... other routes if you have them ... */}
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
