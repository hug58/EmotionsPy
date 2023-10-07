import axios from 'axios';
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      console.log('test')

      console.log(response.data)
      // Verificar si se generó un token de autenticación válido en la respuesta
      if (response.data.access) {
        // Guardar el token en el almacenamiento local o en el estado de la aplicación
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        // Redirigir al dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      // Manejar el caso de inicio de sesión fallido
      console.log('Inicio de sesión fallido');
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="text-center text-white">Login</h2>

        <div className="form-group">
          <label htmlFor="username" className="text-white">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="input your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="text-white">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="input your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" style={{ margin: '10px' }}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
