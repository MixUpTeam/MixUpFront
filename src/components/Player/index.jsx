import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import APIManager from 'services/APIManager';
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

  console.log('player -> trackPlaylistId.playlist_id', trackPlaylistId);

  const token =
    'BQCIe8ERUsyIwziwopWPVSRIAiVjNCm1CGBnJccuKeO89UvEFqlotmHqCcfagNS63-v36ZGI17VwHD1UKGzfwFGUhBs-TvK8VZeVv1vESCUWb80PgSn-6j-2-nGpXbIDHeDj51vfWmgsXdS7wFRK9rcT23eZ74HQtbMrYRl96-ZB9RibF8fL5_72VPqgnnp6MxXg2roKL34mdvc';

  const test = async () => {
    console.log('test -> spotifyTrack', spotifyTrack);
    const res = await APIManager.finishTrack(trackPlaylistId);
    console.log(res);

    const newPlaylist = await APIManager.showPlaylist(res.playlist_id);
    console.log('test -> newPlaylist', newPlaylist);
    dispatch(setCurrentTrack(nxtTrack));
  };

  // useEffect(() => {
  //   setNextTrack(tracklist[0]);
  // }, [tracklist]);

  // useEffect(() => {
  //   setTimeout(test, spotifyTrack.duration_ms * 0.9);
  // }, [spotifyTrack]);

  const renderedItem = () => {
    return (
      <>
        <SpotifyPlayer
          autoPlay
          offset={1}
          token={token}
          // eslint-disable-next-line react/prop-types
          uris={['spotify:track:55p8TQ1ggGYOO1gLQrC52D', `${spotifyTrack.uri}`]}
          callback={(e) => {
            console.log(e);
            if (e.position >= 97.5) {
              console.log('presque fini');
              test();
            }
          }}
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
