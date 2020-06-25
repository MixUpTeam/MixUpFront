import React from 'react';
import { useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

import './styles.scss';

const Player = () => {
  const tracklist = useSelector((state) => state.tracks.tracks);

  const token =
    'BQB0MlVqBhnxyvk1KXKIh60eoYDy9Bv2Nb9dI5XRLqxBaW6DtlhREQZZwhmshkj4isCwUFopFRcdIlLyK6Gn441gJS23ATp0LJ7yZNraHmHOlELGNqLN2hD3oWmrOBlHoUjIUcXPxotJBgRJcUl0B3TAtWzjZ8H7kzkHZ751Nyuy6AA9LNhiKbSSqw';

  const uris = [];
  tracklist
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .sort((a, b) => b.score - a.score)
    .map((x) => {
      uris.push(`spotify:track:${x.track_spotify_id}`);
    });
  console.log(uris);

  return (
    <>
      <SpotifyPlayer autoPlay token={token} uris={uris} />
    </>
  );
};

export default Player;
