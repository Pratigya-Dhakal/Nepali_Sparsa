import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../src/routes/route';


const App = () => (
  <Router>
    <div>
      <AppRoutes />
    </div>
  </Router>
);

export default App;
