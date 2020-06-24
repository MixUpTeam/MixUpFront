import React from 'react';
import SpotifyPlayer from 'react-spotify-player';

const Player = () => {
  const size = {
    width: '100%',
    height: 300,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'

  return (
    <>
      <SpotifyPlayer
        uri="spotify:track:55p8TQ1ggGYOO1gLQrC52D"
        size={size}
        view={view}
        theme={theme}
      />
    </>
  );
};

export default Player;