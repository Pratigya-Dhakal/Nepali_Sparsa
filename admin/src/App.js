import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminFooter from './components/common/AdminFooter';
import AppRoutes from '../src/routes/route';


const App = () => (
  <Router>
    <div>
      <AppRoutes />
      <AdminFooter />
    </div>
  </Router>
);

export default App;
