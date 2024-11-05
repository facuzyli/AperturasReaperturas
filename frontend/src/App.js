import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        {/* Rutas protegidas */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* Otras rutas protegidas */}
      </Switch>
    </Router>
  );
}

export default App;
