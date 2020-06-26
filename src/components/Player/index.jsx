import React from 'react';
import SpotifyPlayer from 'react-spotify-player';

const Player = ( {spotifyTrack, trackPlaylistId } ) => {
  const size = {
    width: '100%',
    height: 300,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'

  return (
    <>
      <SpotifyPlayer
        uri={spotifyTrack.uri}
        size={size}
        view={view}
        theme={theme}
      />
    </>
  );
};

export default Player;
