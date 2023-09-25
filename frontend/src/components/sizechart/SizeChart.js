import React from 'react';
import Navbar from '../browsing/Navbar';

function SizeChart() {
  return (
    <div>
        <Navbar/>
      <center><h1>Size Chart</h1></center>
     {/* connecting the html file to the js to show the size charts */}
      <iframe
        src="topSize.html"
        title="Size Chart"
        width="100%"
        height="500px"
        frameBorder="0"
      />
    </div>
  );
}

export default SizeChart;
