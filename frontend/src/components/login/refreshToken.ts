import axios from 'axios';

import jwt_decode from 'jwt-decode';

const checkTokenExpiration = (token: string): boolean => {
  try {
    const decodedToken: any = jwt_decode(token);
    const expirationDate: number = decodedToken.exp * 1000; // Convertir la fecha de expiración a milisegundos

    // Obtener la fecha actual en milisegundos
    const currentDate: number = new Date().getTime();

    // Verificar si la fecha de expiración es menor que la fecha actual
    if (expirationDate < currentDate) {
      return true; // El token ha expirado
    } else {
      return false; // El token no ha expirado
    }
  } catch (error) {
    // Manejar el error en caso de que el token no sea válido
    console.log('Error al decodificar el token:', error);
    return false; // Considerar que el token no ha expirado en caso de error
  }
};

const renewToken = async (): Promise<string> => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: localStorage.getItem('refresh'),
      });

      return response.data.access;
    } catch (error) {
      throw new Error('Token renewal failed');
    }
  };

  export { checkTokenExpiration, renewToken };