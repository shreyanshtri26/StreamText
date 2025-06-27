import React from 'react';
import './ThemeSelector.css';

const THEME_LABELS = {
  space: 'Space',
  sunset: 'Sunset',
  ocean: 'Ocean',
  neon: 'Neon',
};

const ThemeSelector = ({ theme, setTheme, themes }) => (
  <div className="theme-selector">
    <span className="theme-label">Theme:</span>
    {themes.map((t) => (
      <button
        key={t}
        className={`theme-btn${theme === t ? ' selected' : ''}`}
        onClick={() => setTheme(t)}
        aria-label={`Switch to ${THEME_LABELS[t]} theme`}
      >
        {THEME_LABELS[t]}
      </button>
    ))}
  </div>
);

export default ThemeSelector; 