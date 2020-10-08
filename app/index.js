import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import H1 from './createdH1Element';

ReactDOM.render(<H1 />);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

