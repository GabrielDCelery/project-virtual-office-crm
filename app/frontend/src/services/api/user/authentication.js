import axios from 'axios';

class Authentication {
  async setStoredLoginCredentials(user = {}) {
    return localStorage.setItem('user', JSON.stringify(user));
  }

  getCachedUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  createAuthHeader() {
    const { token } = this.getCachedUser() || {};

    if (token) {
      return { 'Authorization': `Bearer ${token}` };
    }

    return {};
  }

  async login({ email, password }) {
    const { data } = await axios({
      method: 'POST',
      url: `/api/users/authenticate`,
      responseType: 'json',
      data: { email, password }
    });

    const { success, payload, errors } = data;

    return { success, payload, errors };
  }

  async logout() {
    return localStorage.removeItem('user');
  }
}

export default new Authentication();
