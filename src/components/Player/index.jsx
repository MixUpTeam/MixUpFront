import React from 'react';
import { useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

import './styles.scss';

const Player = ({ spotifyTrack, trackPlaylistId }: Player) => {
  console.log('Player -> trackPlaylistId', trackPlaylistId);
  console.log('Player -> spotifyTrack', spotifyTrack);

  const tracklist = useSelector((state) => state.tracks.tracks);
  console.log('Player -> tracklist', tracklist);

  const token =
    'BQBCQkw-iOVXEfusAeBTXSvG6YJW0XteiOXT3OQewcQoQtFjl4Qf98lUyLGDwth8uQl45aMQ5XB_aijKZ05Hr-cwOP42jivAub__Yddja-vY8geinZa-Juq99SiSA8t0AFH2R8xv4q3A3o45M2oJf_w6AQVWekXfongQx78drocselDfdk0chb7z6Rr1OkgzyMzWKqhmZokk-t0';

  // const uris = [];
  // tracklist
  //   .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  //   .sort((a, b) => b.score - a.score)
  //   .map((x) => {
  //     uris.push(`spotify:track:${x.track_spotify_id}`);
  //   });
  // console.log(uris);
  console.log([`${spotifyTrack.uri}`, 'spotify:track:55p8TQ1ggGYOO1gLQrC52D']);

  return (
    <>
      <SpotifyPlayer
        autoPlay
        token={token}
        uris={[`${spotifyTrack.uri}`, 'spotify:track:55p8TQ1ggGYOO1gLQrC52D']}
      />
    </>
  );
};

export default Player;
