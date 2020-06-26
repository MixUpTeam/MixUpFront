import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import './styles.scss';

const Player = ({ spotifyTrack, trackPlaylistId }: Player) => {
  const token =
    'BQCKKgXxCI11GdS-cSqHYEXv5hkkY7EGoaWln5Jm4NU9tLT4Chatq3wAV6olinLs4YqyhQPx77_M4VeKWpRDcP3BFLCipajQQenvJIpyF8j8ISYPRAt6a3ir5s-PyoBwgzBHruOVlJr8lzwbJqwGU0DWh7RX_XMaR3AbDTyn4SXSze45efbJpwBFtCcMUteKDydI1BAOnxLLmjo';

  const renderedItem = () => {
    return (
      <>
        <SpotifyPlayer
          autoPlay
          offset={1}
          token={token}
          uris={['spotify:track:55p8TQ1ggGYOO1gLQrC52D', `${spotifyTrack.uri}`]}
          callback={(e) => {
            if (e.position >= 99.5) {
              console.log(`resque fini ${e.position}`);
            }
          }}
        />
      </>
    );
  };
  return <>{renderedItem()}</>;
};

export default Player;
