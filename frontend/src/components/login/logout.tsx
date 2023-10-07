import React from 'react';
import axios from 'axios';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh'); // Obtén el token de actualización almacenado en el almacenamiento local

      if (refreshToken) {
        await axios.post('http://localhost:8000/api/token/logout/', { refresh: refreshToken });
        // Realiza cualquier otra acción necesaria después del logout

        localStorage.removeItem('token'); // Borra el token de acceso del almacenamiento local
        localStorage.removeItem('refresh'); // Borra el token de actualización del almacenamiento local
        window.location.reload();
      } else {
        console.error('No se encontró el token de actualización en el almacenamiento local.');
      }
    } catch (error) {
      // Maneja el error en caso de que ocurra
      console.error('Error al realizar logout:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
