import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

API.interceptors.request.use(
  ({
    headers,
    ...config
  }) => ({
    ...config,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: 'Bearer BQDArAg8rbdss66L86lth_mnX5swd01ABO7Pq1g5JgxqkeTSYmsyiMhRNIMZ-gN_uPPKEFrWK6XzSyffYU3-DAnkutEwFoThvAWjmlW60_-QCOSAA5xYc-5gQdfo8-t8KVPn2G1KO4eT3fJ07XRI',
    },
  }),
  (error) => {
    return Promise.reject(error);
  }
);

export default class SpotifyAPIManager {
  static async getTrackById(tracks) {
    const ids = tracks.map((e) => e.track_spotify_id);
    const res = await API.get(`tracks/?ids=${ids.join(',')}`);
    return res;
  }

  static async searchTrackByQuery(query) {
    const res = await API.get(`search?q=${query}&type=track&limit=5`);
    return res;
  }
}