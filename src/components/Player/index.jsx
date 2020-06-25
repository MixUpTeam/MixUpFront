import React from 'react';
import { useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = () => {
  const tracklist = useSelector((state) => state.tracks.tracks);

  const token =
    'BQDmCYAa-R1A4Gjli3_ZLFP7u_RB9dR2-LuZX8qa1eYoypwRr0_VOZlN09n9qQOy20Nk1Pwv9qslblzNCXOqnVJCTQT44Uz-7s_5Fnk2idNUieGMayTuIgbpFRBs4yVxzjM4Mw4rwQTpDUhCKFJjUTNaKi4gvbkqfClYnISBg8wZ28Wnw28IHD8lmQKqNN7CSHijJNSjCXJLlvQ';

  const uris = [];
  tracklist
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .sort((a, b) => b.score - a.score)
    .map((x) => {
      uris.push(`spotify:track:${x.track_spotify_id}`);
    });

  return (
    <>
      <SpotifyPlayer autoPlay token={token} uris={uris} />
    </>
  );
};

export default Player;
