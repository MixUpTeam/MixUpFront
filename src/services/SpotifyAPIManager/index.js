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
<<<<<<< HEAD
        "Bearer BQCo1sYa96Nx1mpgwmAqr5CqkzA77MHWibqhQVLzQsAGS2UwIS4tqNN4rwYLDleSep4pSXXirPCzQLO1NoN-_xDItAVoMrKyqU2Vk79zIvezx8RdEW04lqObILU6vgitvBRyxCoMdpl_fqO0wvKhm7pS5enCQGMAVfAq5c01RLU6dXJ9KRYKMw2csp7gEQgonGDZid12EIbdlJ_E2J25geWkOfaWE2JjBLaS_W50-irYOtAuYHI4EMg5QLeWx430FoW7lTlkrvvgI_g",
=======
        "Bearer BQDnFGiKJA3JrVbmGjmM1MrYnovxP5_pKrwoLqMPAQd8Jrs0Lu7OFGFJPBDLQGwNCXLSvpnullsu7wFRouzGm1LTlNqHPSe_3FGudANPbPUSZdj95RuvzxN_jEPbPks8FxC1eDyWvDftMlaXZm2UEJDnPGKLrOa5ND6TT3H85HAgwpTrAtlfMjW292KYRaFVAFrUZl4yZjlmrWFb7cYP211LWzq3b8mCRFFC_o3oK4Y4v7kvaqTio_ZMKvu2vKoME_tSbbM6s-oVCR8",
>>>>>>> e0f8217... refresh token
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
