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
        "Bearer BQDsj83XpV7pOMaiZSFRzdDdswBiPbWHU0ZM2huyeuW3lkWtdaVYnxkKsku0iKxbqidIz1kbDLxLsy5Pc4h0WIOYmpEivmr0VWuopd16zwIs0u-j10RRDcQEzLKIAQRW5F1eDuQud6M_MBSjfuPeDBV45Lw3fws7mLr87eNlh4nKuGtXArTqesQ209jidPBvCFjgOMe1deKq1SMVtPHGaGNGwrVMcQh8xjAeJhBGF_UDfw8VlGxmYFYvtuBpuKczk-WKH9LmH3FPdnE",
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

  static async searchTrackByQuery(query) {
    const res = await API.get(`search?q=${query}&type=track&limit=5`);
    return res.data;
  }
}
