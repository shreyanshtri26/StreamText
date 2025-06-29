import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Force default port to 3000 if not set (for local dev)
//process.env.PORT = process.env.PORT || '3000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
