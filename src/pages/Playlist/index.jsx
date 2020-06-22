import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./styles.scss";
import APIManager from "services/APIManager";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { message, Card } from "antd";
import {
  LikeOutlined
} from '@ant-design/icons';

import Likes from 'tools/Likes'
import Dislikes from 'tools/Dislikes'


import ShortID from "shortid";

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
  const userId = 1;
  const classes = useStyles();
  const { playlistId } = useParams();

  const [userTrackChoice, setUserTrackChoice] = useState(null);
  const [playlist, setPlaylist] = useState("");
  const [tracks, setTracks] = useState("");

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

  useEffect(() => {
    const fetchPlaylist = async () => {
      const res = await APIManager.showPlaylist(playlistId);
      setPlaylist(res);
      setTracks(res.entries);
    };
    fetchPlaylist();
  }, [playlistId]);

  const searchBarOnSubmit = async (e) => {
    e.preventDefault();
    if (!userTrackChoice) return message.error("Please choose a track");
    const res = await APIManager.addTrackToPlaylist(
      userId,
      userTrackChoice,
      playlistId
    );
    if (res.status === "error") return message.error(res.messages[0]);
    setTracks([...tracks, res]);
  };

  const inputOnChange = (e, values) => {
    const selectedTrack = values.id;
    setUserTrackChoice(selectedTrack);
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
        <p>{playlist.name}</p>
        {tracks &&
          tracks.map((track) => (
            <Card key={ShortID.generate()} style={{ width: 300 }}>
              <p>{track.track_spotify_id}</p>
              <LikeOutlined onClick={Likes}/> 
              <LikeOutlined rotate={180} onClick={Dislikes}/>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Playlist;
