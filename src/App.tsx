import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/mui-blog-template/Blog';
import IndividualCourse from './components/IndividualCourse';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/individualcourse" element={<IndividualCourse />} />
      </Routes>
    </Router>
  );
};

export default App;