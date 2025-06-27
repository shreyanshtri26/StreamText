import React from 'react';
import './Stats.css';

const Stats = ({ count, max }) => {
  const isAtMax = count >= max;
  
  return (
    <div className={`stats ${isAtMax ? 'stats-max' : ''}`}>
      <div className="stats-content">
        <span className="stats-count">{count}</span>
        <span className="stats-separator">/</span>
        <span className="stats-max">{max}</span>
      </div>
      <div className="stats-label">Active Animations</div>
      {isAtMax && (
        <div className="stats-warning">
          Max capacity reached
        </div>
      )}
    </div>
  );
};

export default Stats; 