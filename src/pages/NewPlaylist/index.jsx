import React, { useState } from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIManager from "services/APIManager";
import { message } from "antd";

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
  const history = useHistory();
  const classes = useStyles();
  const [input, setInput] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input) {
      const res = await APIManager.createPlaylist(1, input);
      console.log(res);
      if (res.status === "success") return history.push(`/playlist/${res.id}`);
      else return message.error("Oops, please try again!", 3);
    } else return message.error("Name can't be blank...", 3);
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
