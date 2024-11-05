import React, { useState,useEffect } from 'react';
import LoginForm from './components/login/login.tsx';
import UserCreationForm from './components/login/createUser';
import Dashboard from './components/dashboard';
import {checkTokenExpiration,renewToken} from './components/login/refreshToken.ts';

import './styles/App.css'

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserCreationForm, setShowUserCreationForm] = useState(false);

  const handleCreateUserClick = () => {
    setShowUserCreationForm(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const isTokenExpired = checkTokenExpiration(token);

      if (isTokenExpired) {
        renewToken()
          .then((newToken) => {
            localStorage.setItem('token', newToken);
            setIsLoggedIn(true);
          })
          .catch((error) => {
            console.log('Token renewal failed', error);
          });
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  

  return (
      <div className="card">
        <div className="card-body text-center">
          {isLoggedIn ? (
            <Dashboard/>
          ) : (
            <>
              {showUserCreationForm ? (
                <UserCreationForm />
              ) : (
                <LoginForm />
              )}
              {!showUserCreationForm && (
                <button onClick={handleCreateUserClick} className="btn btn-primary">
                  Crear Usuario
                </button>
              )}
            </>
          )}
        </div>
      </div>
  );
};

export default App;