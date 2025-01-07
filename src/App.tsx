import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import FastAI from './components/FastAI';
import CS50x from './components/CS50x';
import AndrewNgDeepLearning from './components/andrewNgDeepLearning';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fastAI" element={<FastAI />} />
        <Route path="/CS50x" element={<CS50x />} />
        <Route path="/andrew-ng-deeplearning" element={<AndrewNgDeepLearning />} />
      </Routes>
    </Router>
  );
};

export default App;