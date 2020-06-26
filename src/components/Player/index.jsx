import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

import './styles.scss';
import { setCurrentTrack } from '../../redux';

const Player = ({ spotifyTrack, trackPlaylistId }: Player) => {
  console.log('Player -> trackPlaylistId', trackPlaylistId);
  const dispatch = useDispatch();
  const tracklist = useSelector((state) => state.tracks.tracks);
  const token =
    'BQDabsv0fjBu7tmTx0kaURtOMZMUTju36N1z5Io_12h12WAFS2n9ca-sALOGAfattKaMknnwKKrjimpwEqEM_LgLWVraQBx_neKXAqmQgRErnEFqj0gr6IcX_waith_blgUISkBY1Cz5xW92PoaWc5EPwZXy-xf8rnXjVPrvbEqqv6jXB9dGz8LttwgORNnVa_IjELclYdCpPTU';

  const test = () => {
    const nextSong = tracklist[0];
    console.log('test -> nextSong', nextSong);

    dispatch(setCurrentTrack(nextSong));
  };

  useEffect(() => {
    if (spotifyTrack) {
      setInterval(test, spotifyTrack.duration_ms - 38000);
    }
  }, [spotifyTrack]);

  console.log([`${spotifyTrack.uri}`, 'spotify:track:55p8TQ1ggGYOO1gLQrC52D']);

  const renderedItem = () => {
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
  return <>{renderedItem()}</>;
};

export default Player;
