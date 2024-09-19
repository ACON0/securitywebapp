import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Stream from './Stream';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the login page */}
          <Route path="/" element={<Login />} />

          {/* Protected route for the stream page */}
          <Route path="/stream" element={<Stream />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;