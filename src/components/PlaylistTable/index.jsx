import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import APIManager from 'services/APIManager';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MusicNoteOutlinedIcon from '@material-ui/icons/MusicNoteOutlined';
import MusicOffOutlinedIcon from '@material-ui/icons/MusicOffOutlined';

import { setTracks } from '../../redux';

const PlaylistTable = ({ spotifyDetails }: PlaylistTable) => {
  const dispatch = useDispatch();
  const tracklist = useSelector((state) => state.tracks.tracks);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });
  const classes = useStyles();

  const setTrackPlaylist = (data) => {
    dispatch(setTracks(data));
  };

  const Likes = async (track) => {
    const res = await APIManager.upVote(track.id, 6); // curent_user
    const playlist = await APIManager.showPlaylist(res.playlist_id);
    if (playlist.status === 'success') setTrackPlaylist(playlist.entries);
  };

  const Dislikes = async (track) => {
    const res = await APIManager.downVote(track.id, 6); // curent_user
    const playlist = await APIManager.showPlaylist(res.playlist_id);
    if (playlist.status === 'success') setTrackPlaylist(playlist.entries);
  };

  const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'artist', label: 'Artist', minWidth: 170 },
    { id: 'added_by', label: 'Added by', minWidth: 170 },
    { id: 'score', label: 'Score', minWidth: 170 },
  ];

  const createData = (title, artist, score, added_by, id) => {
    return {
      title,
      artist,
      score,
      added_by,
      id,
    };
  };

  const rows = [];
  spotifyDetails &&
    spotifyDetails.length < 41 &&
    tracklist.map((p) => {
      const title = spotifyDetails.find((el) => p.track_spotify_id === el.id)
        .name;

      const artist = spotifyDetails.find((el) => p.track_spotify_id === el.id)
        .artists[0].name;

      rows.push(createData(title, artist, p.score, p.added_by.username, p.id));
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>
                <MusicNoteOutlinedIcon />
              </TableCell>
              <TableCell>
                <MusicOffOutlinedIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <MusicNoteOutlinedIcon onClick={() => Likes(row)} />
                      </TableCell>
                      <TableCell>
                        <MusicOffOutlinedIcon onClick={() => Dislikes(row)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows ? rows.length : ''}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PlaylistTable;
