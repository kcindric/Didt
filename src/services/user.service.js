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

  deleteEvent(id, token) {
    return axios
      .delete(
        API_URL + `events/${id}`, { headers: authHeader(token)}
      );
  }
}

export default new UserService();
