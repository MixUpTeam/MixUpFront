import React, { useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import APIManager from 'services/APIManager';
import { useDispatch } from 'react-redux';
import { spotifyTokenPremium } from '../../constants';
import { setTracks, setCurrentTrack } from '../../redux';

import './styles.scss';

// eslint-disable-next-line react/prop-types
const Player = ({ spotifyTrack, trackPlaylistId }) => {
  const dispatch = useDispatch();

  const transition = async () => {
    const res = await APIManager.finishTrack(trackPlaylistId);
    const newPlaylist = await APIManager.showPlaylist(res.playlist_id);

    dispatch(setTracks(newPlaylist.entries));
    dispatch(setCurrentTrack(newPlaylist.entries[0]));
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setTimeout(transition, spotifyTrack.duration_ms * 0.1);
  }, [spotifyTrack]);

  return (
    <>
      <SpotifyPlayer
        autoPlay
        offset={1}
        token={spotifyTokenPremium}
        // eslint-disable-next-line react/prop-types
        uris={['spotify:track:55p8TQ1ggGYOO1gLQrC52D', `${spotifyTrack.uri}`]}
      />
    </>
  );
};

export default Player;
