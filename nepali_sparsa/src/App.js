import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/UserRoutes/userRoutes';
import AdminRoutes from './routes/AdminRoutes/AdminRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/*" element={<AppRoutes />} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
