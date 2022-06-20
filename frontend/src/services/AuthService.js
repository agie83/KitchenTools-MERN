import jwtDecode from 'jwt-decode';
import { LOGIN_URL } from '../constants/url';

export default class AuthService {
  static async login({ email, password }) {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const { token, message = 'Server error' } = await response.json();
    if (response.status > 200) {
      throw new Error(message);
    }
    const user = jwtDecode(token);
    localStorage.setItem('access_token', token);
    return { token, user };
  }

  static getUser() {
    const token = localStorage.getItem('access_token');
    const user = token ? jwtDecode(token) : null;
    return { user, token };
  }

  static logout() {
    localStorage.removeItem('access_token');
  }
}
