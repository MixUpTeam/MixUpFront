import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
// import APIManager from 'services/APIManager';
import { useSelector, useDispatch } from 'react-redux';
// import { message } from 'antd';
import { setCurrentTrack } from '../../redux';

import './styles.scss';

const Player = ({ spotifyTrack, trackPlaylistId }: Player) => {
  console.log('Player -> trackPlaylistId', trackPlaylistId);
  console.log('Player -> spotifyTrack', spotifyTrack);
  const dispatch = useDispatch();
  const tracklist = useSelector((state) => state.tracks.tracks);
  const [nxtTrack, setNextTrack] = useState(null);

  const token =
    'BQDC2RjOEcpjc1cB9UvJ0PRUq_dToTYcVQH1HGeDZLlByZYdbQJkriZxW5m-3CWOl9HD-WPNpIjPIe8BSIOJval3vGO-gx6IVs6FJrdiO7YZDNjaIUKrRoiqEkCBourmSlLr-TQfPu_-dOWF1G0jcYr_hfs76GmIklcQBIlvwkxD1sF4-We0b3QyH18HBpUAow0sXMpd8JH5jmQ';

  const test = () => {
    dispatch(setCurrentTrack(nxtTrack));
  };

  useEffect(() => {
    setNextTrack(tracklist[0]);
  }, [tracklist]);

  useEffect(() => {
    setTimeout(test, spotifyTrack.duration_ms * 0.9);
  }, [spotifyTrack]);

  const renderedItem = () => {
    return (
      <>
        <SpotifyPlayer
          autoPlay
          offset={1}
          token={token}
          // eslint-disable-next-line react/prop-types
          uris={['spotify:track:55p8TQ1ggGYOO1gLQrC52D', `${spotifyTrack.uri}`]}
        />
      </>
    );
  };
  return <>{renderedItem()}</>;
};

export default Player;

// const onTrackFinish = () => {
//   console.log('in On TRack finish');

//   const newTrack = (track) => {
//     console.log('in dispatch new track');
//     dispatch(setCurrentTrack(track));
//   };

//   const getNextTrack = async () => {
//     console.log('in async');
//     const res = await APIManager.finishTrack(trackPlaylistId);
//     if (res.status === 'success') {
//       console.log(res);
//       newTrack(res);
//     } else {
//       return message.error(res.messages[0], 3);
//     }
//   };
//   getNextTrack();
// };
