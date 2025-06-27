import React from 'react';
import './Demo.css';

const Demo = ({ onTextSelect, onClose }) => {
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
      {onClose && (
        <button className="demo-close-btn" onClick={onClose} aria-label="Close examples">×</button>
      )}
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
      </div>
    </div>
  );
};

export default Demo; 