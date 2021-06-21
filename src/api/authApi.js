import { httpClient } from '@/api/httpClient';

export const authApi = {
  fetchUser() {
    return httpClient.get('/auth/user');
  },

  login(email, password) {
    return httpClient.post('/auth/login', {
      email,
      password,
    });
  },

  register(email, fullname, password) {
    return httpClient.post('/auth/register', {
      email,
      fullname,
      password,
    });
  },

  logout() {
    return httpClient.post('/auth/login', {
      email: '',
      password: '',
    });
  },
};
