import React, { useEffect, useRef, useCallback } from 'react';
import AnimatedText from './AnimatedText';
import Stats from './Stats';
import './AnimationView.css';

const AnimationView = ({ animations, onBack, onAnimationComplete }) => {
  const containerRef = useRef(null);
  const maxAnimations = 5;

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onBack]);

  // Remove oldest animation if at max capacity
  const activeAnimations = animations.slice(-maxAnimations);

  const handleAnimationComplete = useCallback((animationId) => {
    onAnimationComplete(animationId);
  }, [onAnimationComplete]);

  return (
    <div className="container">
      <div className="animation-view" ref={containerRef}>
        <button className="back-btn" onClick={onBack}>
          ← Back to Input
        </button>
        
        <Stats count={activeAnimations.length} max={maxAnimations} />
        
        <div className="animation-canvas">
          {activeAnimations.map((animation) => (
            <AnimatedText
              key={animation.id}
              id={animation.id}
              text={animation.text}
              onComplete={handleAnimationComplete}
            />
          ))}
        </div>
        
        {activeAnimations.length === 0 && (
          <div className="empty-state">
            <h2>🎬 Ready for Animations!</h2>
            <p>Go back to input view to create your first animation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimationView; 