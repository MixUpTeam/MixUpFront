import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

API.interceptors.request.use(
  ({ headers, ...config }) => ({
    ...config,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization:
        'Bearer BQAzCKQlrRJbeWMj5_7IaqWX0y6BqaIYMM28x1pkTY_k-zdyhUKSri6bp6i8AkzBeIbRnGwV88J8HYiJYb3hA270tip9NsnsGaT2dSCf5WzgjudEEH1vLc0Xrp710s1cLqJg5rls2dG5ZdI3xd5O911pKvMj8pZFwin9nGY9x_u_7AxexSnaSPDEzrocsIO9u9-SIt0aBBu-Cb5tXo7JMHUk9vqMvVAyeAUGkVxvOoUPaf-ipHjcYKTEC1-2Mz8DJmAzYSRSFIdXs0Q',
    },
  }),
  (error) => {
    return Promise.reject(error);
  }
);

export default class SpotifyAPIManager {
  static async getTrackById(tracks) {
    const ids = tracks.map((e) => e.track_spotify_id);
    console.log(ids.join(','));
    const res = await API.get(`tracks/?ids=${ids.join(',')}`);
    return res.data;
  }

  static async searchTrackByQuery(query) {
    const res = await API.get(`search?q=${query}&type=track&limit=5`);
    return res.data;
  }
}
