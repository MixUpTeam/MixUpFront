import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import APIManager from "services/APIManager";
import SpotifyAPIManager from "services/SpotifyAPIManager";
import ShortID from "shortid";
import "./styles.scss";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { message, Card } from "antd";
import { LikeOutlined } from "@ant-design/icons";

import { setTracks } from "../../redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
      borderColor: "white",
    },
  },
}));

const Playlist = () => {
  const userId = 1; // curent_user
  const classes = useStyles();
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const tracklist = useSelector((state) => state.tracks.tracks);
  const [userTrackChoice, setUserTrackChoice] = useState(null);
  const [playlist, setPlaylist] = useState("");
  const [spotifyDetails, setSpotifyDetails] = useState();
  const [suggestions, setSuggestions] = useState([]);

  const setTrackPlaylist = (data) => {
    dispatch(setTracks(data));
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      console.log("fetchPlaylist -> playlistId", playlistId);
      const res = await APIManager.showPlaylist(playlistId);
      if (res.entries.length !== 0) setTrackPlaylist(res.entries);
      else message.success("This is a fresh playlist", 3);
    };
    fetchPlaylist();
  }, [playlistId]);

  const Likes = async (track) => {
    const res = await APIManager.upVote(track.id, 6); // curent_user
    const playlist = await APIManager.showPlaylist(res.playlist_id);
    if (playlist.status === "success") setTrackPlaylist(playlist.entries);
  };

  const Dislikes = async (track) => {
    const res = await APIManager.downVote(track.id, 6); // curent_user
    const playlist = await APIManager.showPlaylist(res.playlist_id);
    if (playlist.status === "success") setTrackPlaylist(playlist.entries);
  };

  useEffect(() => {
    const fetchTracks = async () => {
      const res = await SpotifyAPIManager.getTrackById(tracklist);
      console.log(res.tracks);
      setSpotifyDetails(res.tracks);
    };
    if (tracklist[0]) fetchTracks();
  }, [tracklist]);

  const searchBarOnSubmit = async (e) => {
    e.preventDefault();
    console.log("searchBarOnSubmit -> userId", userId);
    console.log("searchBarOnSubmit -> userTrackChoice", userTrackChoice);
    console.log("searchBarOnSubmit -> playlistId", playlistId);
    console.log(userTrackChoice);
    console.log(spotifyDetails);
    if (!userTrackChoice) return message.error("Please choose a track");
    const res = await APIManager.addTrackToPlaylist(
      userId,
      userTrackChoice,
      playlistId
    );
    const playlist = await APIManager.showPlaylist(res.playlist_id);
    if (res.status === "error") return message.error(res.messages[0]);
    setSpotifyDetails([...spotifyDetails, userTrackChoice]);
    setTrackPlaylist(playlist.entries);
  };

  const inputOnChange = (e, values) => {
    const selectedTrack = values.id;
    if (selectedTrack) setUserTrackChoice(selectedTrack);
  };

  const handleChange = async (e) => {
    const inputSearch = e.target.value;
    if (inputSearch) {
      const res = await SpotifyAPIManager.searchTrackByQuery(inputSearch);
      console.log(res.tracks.items);
      setSuggestions(res.tracks.items);
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
              style={{ width: "100%" }}
              onChange={inputOnChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  id="trach-search-input"
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
        <p>This is the detail page of a playlist</p>

        {spotifyDetails &&
          tracklist
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .sort((a, b) => b.score - a.score)
            .map((track) => (
              <Card key={ShortID.generate()} style={{ width: 300 }}>
                <p>
                  {
                    spotifyDetails.find(
                      (el) => track.track_spotify_id === el.id
                    ).name
                  }{" "}
                  (by{" "}
                  {
                    spotifyDetails.find(
                      (el) => track.track_spotify_id === el.id
                    ).artists[0].name
                  }
                  )
                </p>
                <LikeOutlined onClick={() => Likes(track)} />
                <LikeOutlined rotate={180} onClick={() => Dislikes(track)} />
              </Card>
            ))}
      </div>
    </>
  );
};

export default Playlist;
