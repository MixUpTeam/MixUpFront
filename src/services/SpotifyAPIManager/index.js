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
        "Bearer BQCo1sYa96Nx1mpgwmAqr5CqkzA77MHWibqhQVLzQsAGS2UwIS4tqNN4rwYLDleSep4pSXXirPCzQLO1NoN-_xDItAVoMrKyqU2Vk79zIvezx8RdEW04lqObILU6vgitvBRyxCoMdpl_fqO0wvKhm7pS5enCQGMAVfAq5c01RLU6dXJ9KRYKMw2csp7gEQgonGDZid12EIbdlJ_E2J25geWkOfaWE2JjBLaS_W50-irYOtAuYHI4EMg5QLeWx430FoW7lTlkrvvgI_g",
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
