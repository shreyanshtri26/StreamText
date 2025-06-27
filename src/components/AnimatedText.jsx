import React, { useEffect, useState, useRef } from 'react';
import './AnimatedText.css';

const AnimatedText = ({ id, text, onComplete }) => {
  const [animationStyle, setAnimationStyle] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef(null);

  // Animation types and their configurations
  const animationTypes = [
    {
      name: 'slideRight',
      getStartPosition: (containerWidth, containerHeight) => ({
        left: -100,
        top: Math.random() * (containerHeight - 60)
      })
    },
    {
      name: 'slideLeft',
      getStartPosition: (containerWidth, containerHeight) => ({
        left: containerWidth + 100,
        top: Math.random() * (containerHeight - 60)
      })
    },
    {
      name: 'slideDown',
      getStartPosition: (containerWidth, containerHeight) => ({
        left: Math.random() * (containerWidth - 200),
        top: -100
      })
    },
    {
      name: 'slideUp',
      getStartPosition: (containerWidth, containerHeight) => ({
        left: Math.random() * (containerWidth - 200),
        top: containerHeight + 100
      })
    },
    {
      name: 'diagonal',
      getStartPosition: (containerWidth, containerHeight) => ({
        left: -100,
        top: -100
      })
    }
  ];

  useEffect(() => {
    const initializeAnimation = () => {
      const container = elementRef.current?.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Select random animation type
      const randomType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      
      // Get random start position
      const startPosition = randomType.getStartPosition(containerWidth, containerHeight);
      
      // Random duration between 3-7 seconds
      const duration = 3 + Math.random() * 4;
      
      // Random color using HSL
      const hue = Math.random() * 360;
      const saturation = 70 + Math.random() * 20; // 70-90%
      const lightness = 50 + Math.random() * 20; // 50-70%
      
      // Random font size
      const fontSize = 1.2 + Math.random() * 0.8; // 1.2-2.0em

      setAnimationStyle({
        left: `${startPosition.left}px`,
        top: `${startPosition.top}px`,
        animation: `${randomType.name} ${duration}s ease-in-out forwards`,
        background: `linear-gradient(135deg, 
          hsla(${hue}, ${saturation}%, ${lightness}%, 0.9), 
          hsla(${(hue + 60) % 360}, ${saturation}%, ${lightness}%, 0.9)
        )`,
        fontSize: `${fontSize}em`,
        '--animation-duration': `${duration}s`
      });

      setIsAnimating(true);

      // Set timeout to call onComplete when animation ends
      setTimeout(() => {
        onComplete(id);
      }, duration * 1000);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeAnimation, 100);
    return () => clearTimeout(timer);
  }, [id, onComplete]);

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