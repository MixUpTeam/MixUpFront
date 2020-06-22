import axios from "axios";

const API = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

API.interceptors.request.use(
  ({ headers, ...config }) => ({
    ...config,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization:
        "Bearer BQC71AygcP7KBryHkEszU1Xhve4GrFmnCfiY4o92Xbzy6KfpC4hPCBN59QQduM0vjaIIamvgWZClA343540",
    },
  }),
  (error) => {
    return Promise.reject(error);
  }
);

export default class SpotifyAPIManager {
  static async getTrackById(tracks) {
    const ids = tracks.map((e) => e.track_spotify_id);
    console.log(ids.join(","));
    const res = await API.get(`tracks/?ids=${ids.join(",")}`);
    return res.data;
  }
}
