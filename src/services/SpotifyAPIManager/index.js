import axios from 'axios';
import Cookies from 'js-cookie';
import { cookieNameForSpotifyAuth } from '../../constants';
import SpotifyAuthManager from '../SpotifyAuthManager';

const renewSpotifyToken = async () => {
  const res = await SpotifyAuthManager.getToken();
  Cookies.set(cookieNameForSpotifyAuth, res.data.access_token, {
    expires: new Date(new Date().getTime() + 55 * 60 * 1000),
  });
  return res.data.access_token;
};

const token =
  Cookies.get(cookieNameForSpotifyAuth) !== undefined
    ? Cookies.get(cookieNameForSpotifyAuth)
    : renewSpotifyToken();

const API = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

API.interceptors.request.use(
  ({ headers, ...config }) => ({
    ...config,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
