import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import FastAI from './components/FastAI';
import CS50x from './components/CS50x';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fastAI" element={<FastAI />} />
        <Route path="/CS50x" element={<CS50x />} />

      </Routes>
    </Router>
  );
};

export default App;