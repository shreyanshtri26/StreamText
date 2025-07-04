import React, { useState } from 'react';
import Demo from './Demo';
import './InputView.css';

const InputView = ({ onSubmit, theme }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    
    if (trimmedText && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit(trimmedText);
      setText('');
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleDemoSelect = (selectedText) => {
    setText(selectedText);
    setShowDemo(false);
  };

  return (
    <div className="container" style={{position: 'center'}}>
      <div className="input-view">
        <h1>✨ StreamText</h1>
        <p>Enter a name or short phrase to see it come alive!</p>
        
        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your text here..."
            maxLength={50}
            required
            disabled={isSubmitting}
          />
          
          <div className="button-group">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={!text.trim() || isSubmitting}
            >
              {isSubmitting ? 'Launching...' : 'Launch Animation'}
            </button>
            
            <button 
              type="button"
              className="demo-btn"
              onClick={() => setShowDemo(true)}
            >
              🎬 Try Examples
            </button>
          </div>
        </form>
        
        <div className="input-tips">
          <h7>⌨️ Press Enter to submit quickly and ESC to go back</h7>
        </div>
      </div>

      {showDemo && (
        <div className="demo-popup-wrapper">
          <Demo 
            onTextSelect={handleDemoSelect}
            onClose={() => setShowDemo(false)}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
};

export default InputView; 