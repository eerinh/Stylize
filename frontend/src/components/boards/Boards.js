import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './Boards.css';

function Boards() {

  //initalise varables for boards and photos (as files)
  const [files, setFiles] = useState([0]); 

  //array for the board files. multiple images can be stored
  const [boards, setBoards] = useState([
    { title: <b>Board One</b>, boardsFiles: [] }, 
    { title: <b>Board Two</b>, boardsFiles: [] },
    { title: <b>Board Three</b>, boardsFiles: [] },
  ]);

  //check if the file is selected and create a URL for it
  function getFile(event, boardsIndex) {
    if (event.target.files.length > 0) {
      const newFile = URL.createObjectURL(event.target.files[0]);
      // Add the new file URL to files
      setFiles([...files, newFile]); 

      // Add the new file URL to the board that the user whats to put that image in
      const updatedPanels = [...boards];
      updatedPanels[boardsIndex].boardsFiles.push(newFile);
      //update the board with the image
      setBoards(updatedPanels);
    }
  }

  return (
    //display the nav bar for consistency 
    <div className="board-nav">
      <Navbar />
      <center>
        <h1>Your Boards</h1>
        <div className="panels">
          {boards.map((boards, index) => (
            <div key={index} className="panel">
              <span>{boards.title}</span>
              {/* allow the user to select the files  */}
              <input type="file" onChange={(event) => getFile(event, index)} />
              {boards.boardsFiles.map((file, fileIndex) => (
                <img key={fileIndex} src={file} alt="Uploaded Image" />
              ))}
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}

export default Boards;
