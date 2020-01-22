export default function authHeader(token) {
    // let user = JSON.parse(localStorage.getItem('user'));
  
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }
  