import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  // Estado para almacenar las aperturas
  const [aperturas, setAperturas] = useState([]);

  useEffect(() => {
    // Función para obtener las aperturas desde el backend
    const fetchAperturas = async () => {
      try {
        // Obtener token de autenticación
        const token = localStorage.getItem('token');
        // Establecer token en los encabezados
        axios.defaults.headers.common['x-auth-token'] = token;
        // Realizar solicitud al backend
        const res = await axios.get('/api/aperturas');
        // Actualizar el estado con las aperturas obtenidas
        setAperturas(res.data);
      } catch (err) {
        console.error(err.response.data.msg);
      }
    };

    fetchAperturas();
  }, []);

  return (
    <div>
      <h2>Dashboard del Encargado</h2>
      <table>
        <thead>
          <tr>
            <th>Número de Local</th>
            <th>Tipo</th>
            <th>Fecha de Apertura</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {aperturas.map((apertura) => (
            <tr key={apertura._id}>
              <td>{apertura.numeroLocal}</td>
              <td>{apertura.tipo}</td>
              <td>{new Date(apertura.fechaApertura).toLocaleDateString()}</td>
              <td>{apertura.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
