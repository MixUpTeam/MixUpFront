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
    return Promise.reject(error);
  }
);

export default class APIManager {
  static async createPlaylist(userId, name) {
    const res = await API.post("api/v1/playlists", { owner_id: userId, name });
    return res.data;
  }

  static async addTrackToPlaylist(added_by_id, track_spotify_id, playlist_id) {
    const res = await API.post("api/v1/track_playlists", {
      added_by_id,
      track_spotify_id,
      playlist_id,
    });
    console.log(res.data)
    return res.data;
  }
  static async showPlaylist(playlistId) {
    const res = await API.get(`api/v1/playlists/${playlistId}`);
    return res.data;
  }

  static async upVote(track_playlist_id, voted_by_id) {
    const res = await API.post(`/api/v1/track_playlist/${track_playlist_id}/up_vote`, {
      voted_by_id
    });
    console.log(res);
    return res.data;
  }

  static async downVote(track_playlist_id) {
    const res = await API.post(`/api/v1/track_playlist/${track_playlist_id}/down_vote`);
    return res.data;
  }
}
