import React, { useState } from 'react';
import Navbar from '../landing/NavbarLanding';
import '../landing/NavbarLanding';
import './Aboutus.css'; //import the necessary files

function Aboutus() {
  // array to store the questions 
  const questions = [
    {
      question: 'What Is Stylize?',
      answer: 'Stylize is a website which allows you to embrace your love of Style. Stylize will help you find what you are looking for in a click of a button!',
    },
    {
      question: 'How Do I Use Stylize?',
      answer: 'Stylize is easy and simple to use! Create an account for Free to start uploading. Simply upload your files to find your match.',
    },
    {
      question: 'Can I Share my Matches?',
      answer: 'Yes! You are able to share your matches with your friends.',
    },
    {
      question: 'Who is behind Stylize?',
      answer: 'Four university students who are passionate about making clothes styling easy, all whilst saving time!',
    },
  ];

  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    if (selected === index)
     {
    // Deselect if it's already selected
      setSelected(null); 
    } else {
        // Select the clicked item
      setSelected(index); 
    }
  };

  return (
    <div className="bar">

    {/* add the navigation bar to the page  */}
    <Navbar/>
    <center><h1> Frequently Asked Questions &nbsp;</h1></center>
    <center><p> Need some help understanding Stylize? No Worries, Simply click on a + below to get reading! </p></center>

    <div className="About">


      {/* div for the questions */}
      <div className="toggled">
        {questions.map((item, index) => (
          <div className="item" key={index}>
            {/* Lets the user click on the question titles */}
            <div className="title" onClick={() => toggle(index)}>
              <h2> {item.question}</h2>
              <span>{selected === index ? <b>-</b> : <b>+</b>}</span>
            </div>
            {/* answer for the questions shown */}
            <div className={selected === index ? 'content show' : 'content'}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
}

export default Aboutus;
