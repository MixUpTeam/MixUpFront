import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import APIManager from 'services/APIManager';
import SpotifyAPIManager from 'services/SpotifyAPIManager';
import './styles.scss';

import PlaylistTable from 'components/PlaylistTable';
import ShareButton from 'components/ShareButton';
import Player from 'components/Player';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { message } from 'antd';

import { setTracks } from '../../redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
      borderColor: 'white',
    },
  },
}));

const Playlist = () => {
  const userId = useSelector((state) => state.user.data.id);
  const classes = useStyles();
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const tracklist = useSelector((state) => state.tracks.tracks);
  const [userTrackChoice, setUserTrackChoice] = useState(null);
  const [spotifyDetails, setSpotifyDetails] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const setTrackPlaylist = (data) => {
    dispatch(setTracks(data));
  };

  useEffect(() => {
    setTrackPlaylist([]);
    const fetchPlaylist = async () => {
      const res = await APIManager.showPlaylist(playlistId);
      if (res.status === 'success') {
        if (res.entries[0]) {
          setTrackPlaylist(res.entries);
        } else {
          return message.success(
            'This is a fresh playlist, add some sounds!',
            3
          );
        }
      } else {
        return message.error(res.messages[0], 3);
      }
    };
    fetchPlaylist();
  }, [playlistId]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await SpotifyAPIManager.getTrackById(tracklist);
        setSpotifyDetails(res.data.tracks);
      } catch (error) {
        console.error(error);
        return message.error(
          'An error occurred, please contact the service provider.',
          3
        );
      }
    };
    if (tracklist[0]) fetchTracks();
  }, [tracklist]);

  const searchBarOnSubmit = async (e) => {
    e.preventDefault();
    if (!userTrackChoice) return message.error('Please choose a track');
    const res = await APIManager.addTrackToPlaylist(
      userId,
      userTrackChoice.id,
      playlistId
    );
    if (res.status === 'success') {
      setSpotifyDetails([...spotifyDetails, userTrackChoice]);
      const playlist = await APIManager.showPlaylist(res.playlist_id);
      if (playlist.status === 'success') {
        setTrackPlaylist(playlist.entries);
      } else {
        return message.error(playlist.messages[0], 3);
      }
    } else {
      return message.error(res.messages[0], 3);
    }
  };

  const inputOnChange = (e, values) => {
    const selectedTrack = values;
    if (selectedTrack) setUserTrackChoice(selectedTrack);
  };

  const handleChange = async (e) => {
    const inputSearch = e.target.value;
    if (inputSearch) {
      try {
        const res = await SpotifyAPIManager.searchTrackByQuery(inputSearch);
        setSuggestions(res.data.tracks.items);
      } catch (error) {
        console.error(error);
        return message.error(
          'An error occurred, please contact the service provider.',
          3
        );
      }
    } else setSuggestions([]);
  };

  return (
    <>
      <div className="page playlist">
        <div>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => searchBarOnSubmit(e)}
          >
            <Autocomplete
              id="suggestion-list"
              options={suggestions}
              getOptionLabel={(option) =>
                `${option.name} - ${option.artists[0].name}`
              }
              style={{ width: '100%' }}
              onChange={inputOnChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  id="track-search-input"
                  label="name a track here"
                  onChange={(e) => handleChange(e)}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              id="new-playlist-button"
            >
              Add this track
            </Button>
          </form>
        </div>
        {spotifyDetails[0] && <Player spotifyDetails={spotifyDetails} />}
        <ShareButton />
        <p>This is the detail page of a playlist</p>
        {spotifyDetails[0] && <PlaylistTable spotifyDetails={spotifyDetails} />}
      </div>
    </>
  );
};

export default Playlist;
