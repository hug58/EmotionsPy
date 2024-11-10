import React from 'react';
import axios from 'axios';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh');
      if (refreshToken) {
        await axios.post(import.meta.env.VITE_SERVER_URL + 'api/token/logout/', { refresh: refreshToken });
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        window.location.reload();
      } else {
        console.error('The update token was not found in local storage.');
      }
    } catch (error) {
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
