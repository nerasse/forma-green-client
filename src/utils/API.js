import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};
const API = "http://localhost:8800";

export default {
  login: function(email, password) {
    return axios.post(
      `${API}/member/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  benevoleLogin: function(email, password) {
    return axios.post(
      `${API}/benevole/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  register: function(send) {
    return axios.post(`${API}/user/register`, send, { headers: headers });
  },

  memberIsAuth: function() {
    return localStorage.getItem("memberToken") !== null;
  },

  memberIsAdmin: function() {
    return localStorage.getItem("admin") !== false;
  },

  benevoleIsAuth: function() {
    return localStorage.getItem("benevoleToken") !== null;
  },

  logout: function() {
    localStorage.clear();
  },
};