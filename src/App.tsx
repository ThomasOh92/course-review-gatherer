import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/mui-blog-template/Blog';
import FastAI from './components/FastAI';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/fastAI" element={<FastAI />} />
      </Routes>
    </Router>
  );
};

export default App;