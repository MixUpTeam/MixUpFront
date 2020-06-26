import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import './styles.scss';

const Player = ({ spotifyTrack, trackPlaylistId }: Player) => {
  const token =
    'BQBD9lldPwvQUK7q-88v2V5YScS4aAjhDdEaYgqvcWuNyfw7Ve__TNFAHF4taE45Gm44-cc96LC2uEIlfbH4gAWWm-fonOKh_tzJN2RuTA_J4zvrUrGvumm3Ucg8rrLuBBhHw0IQ1jG6R1R4ReLHmuvgZCWqoU3KfDTo1kMon-j47AQuX-YiQ8DNpgrHRB0t74OO0kUBrHuKDDo';

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
