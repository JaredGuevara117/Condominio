import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import InicioAn from './pages/inicioAn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicioAn" element={<InicioAn />} />
        
      </Routes>
    </Router>
  );
}

export default App;
