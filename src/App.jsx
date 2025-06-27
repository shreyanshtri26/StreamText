import React, { useState, useCallback, useEffect } from 'react';
import InputView from './components/InputView';
import AnimationView from './components/AnimationView';
import './App.css';

const THEMES = ['space', 'sunset', 'ocean', 'neon'];
const ANIMATION_TYPES = [
  'slideRight',
  'slideLeft',
  'slideDown',
  'slideUp',
  'diagonal',
  'spiral',
  'wave',
  'particle',
];

function App() {
  const [currentView, setCurrentView] = useState('input');
  const [animations, setAnimations] = useState([]); // All submitted texts with animationType
  const [activeIndexes, setActiveIndexes] = useState([]); // Indexes of currently animating items (max 5)
  const [theme, setTheme] = useState('space');

  // Helper to start up to 5 animations
  const startInitialAnimations = useCallback((animList) => {
    const count = Math.min(5, animList.length);
    setActiveIndexes(Array.from({ length: count }, (_, i) => i));
  }, []);

  // Assign a random animationType and duration on submission
  const handleTextSubmit = useCallback((text) => {
    setAnimations(prev => {
      const randomType = ANIMATION_TYPES[Math.floor(Math.random() * ANIMATION_TYPES.length)];
      const randomDuration = 3 + Math.random() * 4; // 3-7 seconds
      const newAnimation = {
        id: Date.now() + Math.random(),
        text,
        startTime: Date.now(),
        animationType: randomType,
        duration: randomDuration,
      };
      const updated = [...prev, newAnimation];
      // If in animation view and less than 5 active, add to activeIndexes
      if (currentView === 'animation' && activeIndexes.length < 5) {
        setActiveIndexes(ai => [...ai, updated.length - 1]);
      }
      // If in input view, start up to 5
      if (currentView === 'input') {
        setTimeout(() => startInitialAnimations(updated), 0);
        setCurrentView('animation');
      }
      return updated;
    });
  }, [currentView, activeIndexes.length, startInitialAnimations]);

  // On animation complete, remove from activeIndexes and add next waiting animation if any
  const handleAnimationComplete = useCallback((animationId, indexInAnimations) => {
    setActiveIndexes(prev => {
      const idx = prev.indexOf(indexInAnimations);
      if (idx === -1) return prev;
      // Find the next waiting animation index
      const nextIndex = animations.findIndex((_, i) => !prev.includes(i));
      let newActive = [...prev];
      newActive.splice(idx, 1);
      if (nextIndex !== -1) {
        newActive.push(nextIndex);
      }
      return newActive;
    });
  }, [animations]);

  const handleBackToInput = useCallback(() => {
    setCurrentView('input');
    // Do not clear animations or activeIndexes
  }, []);

  useEffect(() => {
    if (activeIndexes.length < 5 && animations.length > activeIndexes.length) {
      // Find the next unstarted animation
      const nextIndex = animations.findIndex((_, i) => !activeIndexes.includes(i));
      if (nextIndex !== -1) {
        setActiveIndexes(prev => [...prev, nextIndex]);
      }
    }
  }, [animations, activeIndexes]);

  return (
    <div className="App" data-theme={theme}>
      {currentView === 'input' ? (
        <InputView onSubmit={handleTextSubmit} theme={theme} />
      ) : (
        <AnimationView
          animations={animations}
          activeIndexes={activeIndexes}
          onBack={handleBackToInput}
          onAnimationComplete={handleAnimationComplete}
          theme={theme}
          setTheme={setTheme}
          themes={THEMES}
        />
      )}
    </div>
  );
}

export default App;
