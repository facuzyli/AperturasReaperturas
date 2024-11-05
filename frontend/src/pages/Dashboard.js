import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [aperturas, setAperturas] = useState([]);

  useEffect(() => {
    const fetchAperturas = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/aperturas', {
        headers: { 'x-auth-token': token },
      });
      setAperturas(res.data);
    };
    fetchAperturas();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {aperturas.map((apertura) => (
          <li key={apertura._id}>
            Local {apertura.numeroLocal} - {apertura.tipo} - Estado: {apertura.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
