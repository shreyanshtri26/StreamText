import React, { useState, useCallback } from 'react';
import InputView from './components/InputView';
import AnimationView from './components/AnimationView';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('input');
  const [animations, setAnimations] = useState([]);

  const handleTextSubmit = useCallback((text) => {
    setCurrentView('animation');
    // Add new animation to the list
    const newAnimation = {
      id: Date.now() + Math.random(),
      text,
      startTime: Date.now(),
    };
    setAnimations(prev => [...prev, newAnimation]);
  }, []);

  const handleBackToInput = useCallback(() => {
    setCurrentView('input');
    setAnimations([]); // Clear all animations when going back
  }, []);

  const handleAnimationComplete = useCallback((animationId) => {
    setAnimations(prev => prev.filter(anim => anim.id !== animationId));
  }, []);

  return (
    <div className="App">
      {currentView === 'input' ? (
        <InputView onSubmit={handleTextSubmit} />
      ) : (
        <AnimationView
          animations={animations}
          onBack={handleBackToInput}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </div>
  );
}

export default App;
