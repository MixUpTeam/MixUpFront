import React from 'react';
import SpotifyPlayer from 'react-spotify-player';

const Player = ({ spotifyDetails }) => {
  const size = {
    width: '100%',
    height: 300,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'

  return (
    <>
      <SpotifyPlayer
        uri={spotifyDetails[0].uri}
        size={size}
        view={view}
        theme={theme}
      />
    </>
  );
};

export default Player;
