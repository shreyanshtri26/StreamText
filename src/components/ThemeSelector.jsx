import React from 'react';
import './ThemeSelector.css';

const THEME_LABELS = {
  space: { name: 'Space', icon: '🌌', color: '#a0f' },
  sunset: { name: 'Sunset', icon: '🌅', color: '#ff6b6b' },
  ocean: { name: 'Ocean', icon: '🌊', color: '#00d2ff' },
  neon: { name: 'Neon', icon: '⚡', color: '#fc00ff' },
  cosmic: { name: 'Cosmic', icon: '✨', color: '#667eea' },
  forest: { name: 'Forest', icon: '🌲', color: '#38ef7d' },
};

const ThemeSelector = ({ theme, setTheme, themes }) => {
  return (
    <div className="theme-selector">
      <div className="theme-label">
        <span className="theme-icon">🎨</span>
        <span>Themes</span>
      </div>
      <div className="theme-buttons">
        {themes.map((t) => (
          <button
            key={t}
            className={`theme-btn ${theme === t ? 'selected' : ''}`}
            onClick={() => setTheme(t)}
            aria-label={`Switch to ${THEME_LABELS[t]?.name || t} theme`}
            data-theme={t}
            style={{ '--theme-color': THEME_LABELS[t]?.color || '#fff' }}
          >
            <span className="theme-btn-icon">{THEME_LABELS[t]?.icon || '🎨'}</span>
            <span className="theme-btn-text">{THEME_LABELS[t]?.name || t}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;