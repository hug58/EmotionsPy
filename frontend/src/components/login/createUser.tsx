import React, { useState } from 'react';
import axios from 'axios';

const UserCreationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_URL + 'api/users/create/', {
        username,
        password
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    window.location.href = '/login';
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="text-center text-white">Create User</h2>

        <div className="form-group">
          <label htmlFor="username" className="text-white">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Input your username"
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
            placeholder="Input your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" style={{ margin: '10px' }}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default UserCreationForm;
