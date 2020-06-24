import axios from 'axios';

const API = axios.create({
  baseURL: 'https://accounts.spotify.com/api/token',
});

API.interceptors.request.use(
  ({ headers, ...config }) => ({
    ...config,
    headers: {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic N2I3Mjc2YzljZTk0NGI5Yzg2NzExMGJkZjg2NmZmYjA6MzBhNmQwM2FiYTI4NGFjNWE1Mjg4NDRlZmIwYTI2NzU=',
    },
  }),
  (error) => {
    return Promise.reject(error);
  }
);

export default class SpotifyAuthManager {
  static async getToken() {
    const res = await API.post('', 'grant_type=client_credentials');
    return res;
  }
}
