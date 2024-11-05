import axios from 'axios';

// Función para establecer el token de autenticación en los encabezados
export const setAuthToken = (token) => {
  if (token) {
    // Si hay token, establecerlo en los encabezados
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // Si no hay token, eliminarlo de los encabezados
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
