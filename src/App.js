import React from 'react';
import Flowchart from './Flowchart';
import './App.css';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="App">
      <h1>ЧЁ БЫ ПОЧИТАТЬ ИЗ ФАНТАСТИКИ?</h1>
      <Flowchart />
      <footer className="attribution">
        <p>
          Вдохновлено{' '}
          <a 
            href="https://x.com/future_is_meow" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            @future_is_meow
          </a>
        </p>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;