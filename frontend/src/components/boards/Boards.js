import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './Boards.css';

function Boards() {
  //adding the boards 
  const [panels, setPanels] = useState([
    { title: "Enter Board Name Here" },
    { title: "Enter Board Name Here" },
    { title: "Enter Board Name Here" },
    { title: "Enter Board Name Here" },
  ]);


  //allow users to edit the name of their board
  const [editableBoardIndex, setEditableBoardIndex] = useState(); 
  const [editedBoardName, setEditedBoardName] = useState('');

  const handleEdit = (index, title) => {
    setEditableBoardIndex(index);
    setEditedBoardName(title);
  };

  const handleSave = (index) => {
    const updatedPanels = [...panels];
    updatedPanels[index].title = editedBoardName;
    setPanels(updatedPanels);
    setEditableBoardIndex(-1);
  };

  return (
    <div className="board-nav">
      <Navbar />
      <center>
        <h1>Your Boards</h1>
        <div className="panels">
          {panels.map((panel, index) => (
            <div key={index} className="panel">
              {editableBoardIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editedBoardName}
                    onChange={(e) => setEditedBoardName(e.target.value)}
                  />
                  <button onClick={() => handleSave(index)}>Save</button>
                </div>
              ) : (
                <div>
                  <span onClick={() => handleEdit(index, panel.title)}>
                    {panel.title}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}

export default Boards;
