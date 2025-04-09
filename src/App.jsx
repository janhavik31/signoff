// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignOffDashboard from './SignOffDashboard';
import TeamSelection from './teamSelectionPage'; // Make sure to create this
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamSelection />} />

        <Route path="/dashboard/:teamName" element={<SignOffDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
