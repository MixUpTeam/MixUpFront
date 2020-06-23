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
        'Bearer BQAV0tHF34giiFE6a_kfvOTayfeQVgXPTBcLVCXSwo8gGsCwG97BlzkOiQtA1zEUfZbZ0qJKnEs0m5TZwqh4HF4tcNBP9NsBZdlw9e0MVIAPO5rrHGFg6cEcVHTIEio3pWGzAyz_7w9r0hX4mDdN-9oy4MiwSug6OUfFwwAlA5gsh0MZXzylfTwqxRqrsmN1LAGTumRCTeuDJpgnMvifDktmlBr-aKWOgd38GUl8jH-tJZ0Cgx1v09zzkhA7Zcli8lspEukPn1MXhOo',
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
