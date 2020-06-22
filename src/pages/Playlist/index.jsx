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
  const [tracks, setTracks] = useState(null);
  const [spotifyDetails, setSpotifyDetails] = useState();

  const tempFakeSuggestions = [
    {
      id: "this is the first choice",
    },
    {
      id: "second choice is this",
    },
    {
      id: "yet here is a third one",
    },
    {
      id: "about time to have a fourth",
    },
    {
      id: "be careful, fifth coming",
    },
  ];

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
      const res = await SpotifyAPIManager.getTrackById(tracks);
      console.log(res.tracks);
      setSpotifyDetails(res.tracks);
    };
    if (tracks) fetchTracks();
  }, [tracks]);

  const searchBarOnSubmit = async (e) => {
    e.preventDefault();
    console.log("searchBarOnSubmit -> userId", userId);
    console.log("searchBarOnSubmit -> userTrackChoice", userTrackChoice);
    console.log("searchBarOnSubmit -> playlistId", playlistId);

    if (!userTrackChoice) return message.error("Please choose a track");
    const res = await APIManager.addTrackToPlaylist(
      userId,
      userTrackChoice,
      playlistId
    );
    const playlist = await APIManager.showPlaylist(res.playlist_id);
    if (res.status === "error") return message.error(res.messages[0]);
    setTracks([...tracks, res]);
    setTrackPlaylist(playlist.entries);
  };

  const inputOnChange = (e, values) => {
    const selectedTrack = values.id;
    if (selectedTrack) setUserTrackChoice(selectedTrack);
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
              options={tempFakeSuggestions}
              getOptionLabel={(option) => option.id}
              style={{ width: "100%" }}
              onChange={inputOnChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  id="trach-search-input"
                  label="name a track here"
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
        {tracklist &&
          tracklist
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .sort((a, b) => b.score - a.score)
            .map((track) => (
              <Card key={ShortID.generate()} style={{ width: 300 }}>
                <p>{track.track_spotify_id}</p>
                <p>{track.score}</p>
                <LikeOutlined onClick={() => Likes(track)} />
                <LikeOutlined rotate={180} onClick={() => Dislikes(track)} />
              </Card>
            ))}
      </div>
    </>
  );
};

export default Playlist;
