import axios from 'axios';
import authHeader from './auth-headers';

const API_URL = 'http://localhost:8080/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getEvents(start, end, token) {
    return axios
      .get(
        API_URL + `events?start=${start}&end=${end}`, { headers: authHeader(token) }
      );
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
