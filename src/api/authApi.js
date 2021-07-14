import { httpClient } from '@/api/httpClient';
import { removeUserData } from '@/services/authServices';

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
    removeUserData();
    location.reload();
    return httpClient.post('/auth/logout', {
      email: '',
      password: '',
    });
  },
};
