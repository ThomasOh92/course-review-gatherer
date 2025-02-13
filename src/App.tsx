import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import FastAI from './components/FastAI';
import CS50x from './components/CS50x';
import AndrewNgDeepLearning from './components/AndrewNgDeepLearning';
import { GlobalStyles } from '@mui/material';


const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles styles={{ body: { backgroundColor: '#f0f0f0' } }} />
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