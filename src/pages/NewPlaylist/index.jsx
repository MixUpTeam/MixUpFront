import React, { useState } from "react";
import "./styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
      borderColor: "white",
    },
  },
}));

const NewPlaylist = () => {
  const classes = useStyles();
  const [input, setInput] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    // Api request : method:post, url:'/playlist'
    // If(success) history.push("/playlist/${:playlistId}")
  };

  return (
    <div className="page new-playlist-page">
      <h1>Create a playlist</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          id="outlined-basic"
          label="Choose a name"
          variant="outlined"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          id="new-playlist-button"
        >
          Create playlist
        </Button>
      </form>
    </div>
  );
};

export default NewPlaylist;
