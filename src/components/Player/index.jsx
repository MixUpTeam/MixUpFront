import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import APIManager from 'services/APIManager';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { setCurrentTrack } from '../../redux';

import './styles.scss';

const Player = ({ spotifyTrack, trackPlaylistId }: Player) => {
  const dispatch = useDispatch();
  const token =
    'BQCKKgXxCI11GdS-cSqHYEXv5hkkY7EGoaWln5Jm4NU9tLT4Chatq3wAV6olinLs4YqyhQPx77_M4VeKWpRDcP3BFLCipajQQenvJIpyF8j8ISYPRAt6a3ir5s-PyoBwgzBHruOVlJr8lzwbJqwGU0DWh7RX_XMaR3AbDTyn4SXSze45efbJpwBFtCcMUteKDydI1BAOnxLLmjo';

  const onTrackFinish = () => {
    console.log('in On TRack finish');

    const newTrack = (track) => {
      console.log('in dispatch new track');
      dispatch(setCurrentTrack(track));
    };

    const getNextTrack = async () => {
      console.log('in async');
      const res = await APIManager.finishTrack(trackPlaylistId);
      if (res.status === 'success') {
        console.log(res);
        newTrack(res);
      } else {
        return message.error(res.messages[0], 3);
      }
    };
    getNextTrack();
  };
  const renderedItem = () => {
    return (
      <>
        <SpotifyPlayer
          autoPlay
          offset={1}
          token={token}
          uris={['spotify:track:55p8TQ1ggGYOO1gLQrC52D', `${spotifyTrack.uri}`]}
          callback={(e) => {
            console.log('presque fini');
            if (e.position >= 95) {
              onTrackFinish();
            }
          }}
        />
      </>
    );
  };
  return <>{renderedItem()}</>;
};

export default Player;
