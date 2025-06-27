import React from 'react';
import './Demo.css';

const Demo = ({ onTextSelect }) => {
  const exampleTexts = [
    "Hello World!",
    "Congratulations!",
    "Happy Birthday!",
    "Welcome!",
    "Amazing!",
    "Thank You!",
    "Awesome!",
    "Great Job!",
    "Well Done!",
    "Fantastic!"
  ];

  return (
    <div className="demo-container">
      <div className="demo-content">
        <h2>🚀 Quick Start Examples</h2>
        <p>Click any example to see it animated:</p>
        
        <div className="example-grid">
          {exampleTexts.map((text, index) => (
            <button
              key={index}
              className="example-button"
              onClick={() => onTextSelect(text)}
            >
              {text}
            </button>
          ))}
        </div>
        
        <div className="demo-features">
          <h3>✨ Features</h3>
          <ul>
            <li>5 different animation types</li>
            <li>Random colors and positions</li>
            <li>Interactive hover and click effects</li>
            <li>Up to 5 simultaneous animations</li>
            <li>Responsive 16:9 aspect ratio</li>
            <li>Keyboard shortcuts (ESC to return)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Demo; 