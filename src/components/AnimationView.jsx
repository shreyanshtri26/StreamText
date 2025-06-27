import React, { useEffect, useRef, useCallback } from 'react';
import AnimatedText from './AnimatedText';
import Stats from './Stats';
import ThemeSelector from './ThemeSelector';
import './AnimationView.css';

const themeStyles = {
  space: { '--bg-gradient': 'linear-gradient(45deg, #1a1a2e, #16213e, #0f3460)', '--text-color': '#fff', '--text-shadow': '0 0 8px #fff, 0 0 16px #fff, 0 0 32px #a0f, 0 0 64px #0ff' },
  sunset: { '--bg-gradient': 'linear-gradient(120deg, #ff9966 0%, #ff5e62 100%)', '--text-color': '#fffbe8', '--text-shadow': '0 0 8px #fffbe8, 0 0 16px #ffb347, 0 0 32px #ff5e62' },
  ocean: { '--bg-gradient': 'linear-gradient(120deg, #2193b0 0%, #6dd5ed 100%)', '--text-color': '#fff', '--text-shadow': '0 0 8px #fff, 0 0 16px #6dd5ed, 0 0 32px #2193b0' },
  neon: { '--bg-gradient': 'linear-gradient(120deg, #fc00ff 0%, #00dbde 100%)', '--text-color': '#fff', '--text-shadow': '0 0 8px #fff, 0 0 16px #0ff, 0 0 32px #fc00ff' },
};

const AnimationView = ({ animations, activeIndexes, onBack, onAnimationComplete, theme, setTheme, themes }) => {
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

  // Only render animations at activeIndexes
  const activeAnimations = activeIndexes
    .map(idx => animations[idx])
    .filter(Boolean);

  // Handle animation completion - pass the animation index in the queue
  const handleAnimationComplete = useCallback((animationId) => {
    // Find the index of this animation in the animations array
    const animationIndex = animations.findIndex(anim => anim.id === animationId);
    if (animationIndex !== -1) {
      onAnimationComplete(animationId, animationIndex);
    }
  }, [animations, onAnimationComplete]);

  // Set theme CSS variables
  const styleVars = themeStyles[theme] || themeStyles.space;

  return (
    <div className="container">
      <div className="animation-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Input
        </button>
        <Stats count={activeAnimations.length} max={maxAnimations} />
        <ThemeSelector theme={theme} setTheme={setTheme} themes={themes} />
      </div>
      <div className="animation-view" ref={containerRef} style={styleVars}>
        <div className="animation-canvas">
          {activeAnimations.map((animation) => (
            <AnimatedText
              key={animation.id}
              id={animation.id}
              text={animation.text}
              animationType={animation.animationType}
              duration={animation.duration}
              onComplete={handleAnimationComplete}
              theme={theme}
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