import axios from 'axios';

import jwt_decode from 'jwt-decode';

const checkTokenExpiration = (token: string): boolean => {
  try {
    const decodedToken: any = jwt_decode(token);
    const expirationDate: number = decodedToken.exp * 1000;
    const currentDate: number = new Date().getTime();

    if (expirationDate < currentDate) {
      return true; // token has expired
    } else {
      return false; // token has not expired
    }
  } catch (error) {
    console.log('Error decoding the token:', error);
    return false;
  }
};

const renewToken = async (): Promise<string> => {
    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_URL + 'api/token/refresh/', {
        refresh: localStorage.getItem('refresh'),
      });

      return response.data.access;
    } catch (error) {
      throw new Error('Token renewal failed');
    }
  };

  export { checkTokenExpiration, renewToken };