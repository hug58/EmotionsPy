import React, { useState } from 'react';
import axios from 'axios';

const UserCreationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/create/', {
        username,
        password
      });
  
      // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito o redirigir a otra página
      console.log(response.data);
    } catch (error) {
      // Aquí puedes manejar el error de la API, por ejemplo, mostrar un mensaje de error o realizar alguna acción adicional
      console.error(error);
    }


    window.location.href = '/login';
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="text-center text-white">Crear Usuario</h2>

        <div className="form-group">
          <label htmlFor="username" className="text-white">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Ingresa el nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="text-white">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Ingresa la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" style={{ margin: '10px' }}>Crear Usuario</button>
        </div>
      </form>
    </div>
  );
};

export default UserCreationForm;
