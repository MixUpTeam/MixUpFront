import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use(
  ({ headers, ...config }) => ({
    ...config,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: headers.Authorization || Cookies.get("token"),
    },
  }),
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

export default class APIManager {
  static async createPlaylist(userId, name) {
    const res = await API.post("api/v1/playlists", { owner_id: userId, name });
    return res;
  }

  static async addTrackToPlaylist(added_by_id, track_spotify_id, playlist_id) {
    const res = await API.post("api/v1/track_playlists", { added_by_id, track_spotify_id, playlist_id });
    return res;
  }
}
