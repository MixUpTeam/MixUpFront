import React, { useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import APIManager from 'services/APIManager';
import { useDispatch } from 'react-redux';
import { setTracks, setCurrentTrack } from '../../redux';

import './styles.scss';

const Player = ({ spotifyTrack, trackPlaylistId }) => {
  const dispatch = useDispatch();

  const transition = async () => {
    const res = await APIManager.finishTrack(trackPlaylistId);
    const newPlaylist = await APIManager.showPlaylist(res.playlist_id);

    dispatch(setTracks(newPlaylist.entries));
    dispatch(setCurrentTrack(newPlaylist.entries[0]));
  };

  useEffect(() => {
    setTimeout(transition, spotifyTrack.duration_ms * 0.95);
  }, [spotifyTrack]);

  return (
    <>
      <SpotifyPlayer
        autoPlay
        offset={1}
        token={process.env.REACT_APP_SPOTIFY_TOKEN}
        uris={['spotify:track:55p8TQ1ggGYOO1gLQrC52D', `${spotifyTrack.uri}`]}
      />
    </>
  );
};

export default Player;
