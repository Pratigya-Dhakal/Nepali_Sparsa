import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/userRoutes';
import AdminRoutes from './routes/AdminRoutes/AdminRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <AdminRoutes />
    </Router>
  );
};

export default App;