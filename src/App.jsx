// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignOffDashboard from './SignOffDashboard';
import TeamSelection from './teamSelectionPage'; // Make sure this component exists
import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/team-selection" element={<TeamSelection />} />
        <Route path="/dashboard/:teamName" element={<SignOffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;