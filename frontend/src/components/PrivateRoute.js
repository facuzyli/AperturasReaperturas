import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Componente para proteger rutas privadas
const PrivateRoute = ({ component: Component, ...rest }) => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          // Si está autenticado, renderizar el componente solicitado
          <Component {...props} />
        ) : (
          // Si no está autenticado, redirigir al inicio de sesión
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
