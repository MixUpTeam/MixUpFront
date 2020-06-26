import React from 'react';
import { useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

import './styles.scss';

const Player = () => {
  const tracklist = useSelector((state) => state.tracks.tracks);

  const token =
    'BQCusNh-6863xBq2KBzSAKcJAgoQK8paaihWc8o5ojRicM9NczmdkKU6UVJmev65QOxan8zRRGPyXiDvEhatNkMV9xRAVRqEvxrSkZfsb9XeutGHexBlEWlcZcwfz9-mHvGVZkkkOEILirFG3WF7z_WiStiOW1uzKybn7JwK-piIv-zQv0ZB8HH70OvVUnW4y8Lf7SjkIw3qyA8';

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
