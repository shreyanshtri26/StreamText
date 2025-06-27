import React, { useEffect, useState, useRef, useCallback } from 'react';
import './AnimatedText.css';

const themeTextStyles = {
  space: {
    '--text-color': '#fff',
    '--text-shadow': '0 0 8px #fff, 0 0 16px #fff, 0 0 32px #a0f, 0 0 64px #0ff',
  },
  sunset: {
    '--text-color': '#fffbe8',
    '--text-shadow': '0 0 8px #fffbe8, 0 0 16px #ffb347, 0 0 32px #ff5e62',
  },
  ocean: {
    '--text-color': '#fff',
    '--text-shadow': '0 0 8px #fff, 0 0 16px #6dd5ed, 0 0 32px #2193b0',
  },
  neon: {
    '--text-color': '#fff',
    '--text-shadow': '0 0 8px #fff, 0 0 16px #0ff, 0 0 32px #fc00ff',
  },
};

// Animation type configs
const animationTypeConfigs = {
  slideRight: {
    getStartPosition: (containerWidth, containerHeight) => ({
      left: -100,
      top: Math.random() * (containerHeight - 60)
    })
  },
  slideLeft: {
    getStartPosition: (containerWidth, containerHeight) => ({
      left: containerWidth + 100,
      top: Math.random() * (containerHeight - 60)
    })
  },
  slideDown: {
    getStartPosition: (containerWidth, containerHeight) => ({
      left: Math.random() * (containerWidth - 200),
      top: -100
    })
  },
  slideUp: {
    getStartPosition: (containerWidth, containerHeight) => ({
      left: Math.random() * (containerWidth - 200),
      top: containerHeight + 100
    })
  },
  diagonal: {
    getStartPosition: (containerWidth, containerHeight) => ({
      left: -100,
      top: -100
    })
  },
  spiral: {
    getStartPosition: (containerWidth, containerHeight) => ({
      left: containerWidth / 2 - 50,
      top: containerHeight / 2 - 30
    })
  },
  wave: {
    getStartPosition: (containerWidth, containerHeight) => ({
      left: -100,
      top: containerHeight / 2 - 30
    })
  },
  particle: {
    getStartPosition: (containerWidth, containerHeight) => ({
      left: Math.random() * (containerWidth - 100),
      top: Math.random() * (containerHeight - 60)
    })
  }
};

const AnimatedText = ({ id, text, onComplete, theme = 'space', animationType = 'slideRight', duration = 4 }) => {
  const [animationStyle, setAnimationStyle] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef(null);
  const animationTimeout = useRef(null);

  // Function to start animation using assigned animationType
  const startAnimation = useCallback(() => {
    const container = elementRef.current?.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Use assigned animationType
    const config = animationTypeConfigs[animationType] || animationTypeConfigs.slideRight;
    const startPosition = config.getStartPosition(containerWidth, containerHeight);
    
    // Random color using HSL
    const hue = Math.random() * 360;
    const saturation = 70 + Math.random() * 20; // 70-90%
    const lightness = 50 + Math.random() * 20; // 50-70%
    // Random font size
    const fontSize = 1.2 + Math.random() * 0.8; // 1.2-2.0em

    setAnimationStyle({
      left: `${startPosition.left}px`,
      top: `${startPosition.top}px`,
      animation: `${animationType} ${duration}s linear forwards`,
      background: `linear-gradient(135deg, 
        hsla(${hue}, ${saturation}%, ${lightness}%, 0.9), 
        hsla(${(hue + 60) % 360}, ${saturation}%, ${lightness}%, 0.9)
      )`,
      fontSize: `${fontSize}em`,
      '--animation-duration': `${duration}s`,
      ...themeTextStyles[theme]
    });

    setIsAnimating(true);

    // Set timeout to call onComplete and restart animation
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      if (onComplete) {
        onComplete(id);
      }
      startAnimation(); // Infinite loop
    }, duration * 1000);
  }, [id, onComplete, theme, animationType, duration]);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(startAnimation, 100);
    return () => {
      clearTimeout(timer);
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, [startAnimation]);

  const handleClick = () => {
    if (elementRef.current) {
      elementRef.current.style.animation = 'pulse 0.3s ease-in-out';
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.style.animation = '';
        }
      }, 300);
    }
  };

  const handleMouseEnter = () => {
    if (elementRef.current && isAnimating) {
      elementRef.current.style.transform += ' scale(1.1)';
      elementRef.current.style.transition = 'transform 0.2s ease';
    }
  };

  const handleMouseLeave = () => {
    if (elementRef.current && isAnimating) {
      elementRef.current.style.transform = elementRef.current.style.transform.replace(' scale(1.1)', '');
    }
  };

  return (
    <div
      ref={elementRef}
      className="animated-text"
      style={animationStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </div>
  );
};

export default AnimatedText;