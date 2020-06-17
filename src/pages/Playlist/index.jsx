import React from 'react';

const Playlist = () => {
  console.log('in page playlist');

  const exampleTrack = {
    album: {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/0DxPHf2flBAcV2SnZPg3SV',
          },
          href: 'https://api.spotify.com/v1/artists/0DxPHf2flBAcV2SnZPg3SV',
          id: '0DxPHf2flBAcV2SnZPg3SV',
          name: 'Jake Scott',
          type: 'artist',
          uri: 'spotify:artist:0DxPHf2flBAcV2SnZPg3SV',
        },
      ],
      available_markets: [
        'AD',
        'AE',
        'AR',
        'AT',
        'AU',
        'BE',
        'BG',
        'BH',
        'BO',
        'BR',
        'CA',
        'CH',
        'CL',
        'CO',
        'CR',
        'CY',
        'CZ',
        'DE',
        'DK',
        'DO',
        'DZ',
        'EC',
        'EE',
        'EG',
        'ES',
        'FI',
        'FR',
        'GB',
        'GR',
        'GT',
        'HK',
        'HN',
        'HU',
        'ID',
        'IE',
        'IL',
        'IN',
        'IS',
        'IT',
        'JO',
        'JP',
        'KW',
        'LB',
        'LI',
        'LT',
        'LU',
        'LV',
        'MA',
        'MC',
        'MT',
        'MX',
        'MY',
        'NI',
        'NL',
        'NO',
        'NZ',
        'OM',
        'PA',
        'PE',
        'PH',
        'PL',
        'PS',
        'PT',
        'PY',
        'QA',
        'RO',
        'SA',
        'SE',
        'SG',
        'SK',
        'SV',
        'TH',
        'TN',
        'TR',
        'TW',
        'US',
        'UY',
        'VN',
        'ZA',
      ],
      external_urls: {
        spotify: 'https://open.spotify.com/album/6imRhQCpFOLRWvBf9R0ncF',
      },
      href: 'https://api.spotify.com/v1/albums/6imRhQCpFOLRWvBf9R0ncF',
      id: '6imRhQCpFOLRWvBf9R0ncF',
      images: [
        {
          height: 640,
          url:
            'https://i.scdn.co/image/ab67616d0000b273fbb34faba025e82837c40470',
          width: 640,
        },
        {
          height: 300,
          url:
            'https://i.scdn.co/image/ab67616d00001e02fbb34faba025e82837c40470',
          width: 300,
        },
        {
          height: 64,
          url:
            'https://i.scdn.co/image/ab67616d00004851fbb34faba025e82837c40470',
          width: 64,
        },
      ],
      name: 'Year of the Sunflower',
      release_date: '2019-12-06',
      release_date_precision: 'day',
      total_tracks: 9,
      type: 'album',
      uri: 'spotify:album:6imRhQCpFOLRWvBf9R0ncF',
    },
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/0DxPHf2flBAcV2SnZPg3SV',
        },
        href: 'https://api.spotify.com/v1/artists/0DxPHf2flBAcV2SnZPg3SV',
        id: '0DxPHf2flBAcV2SnZPg3SV',
        name: 'Jake Scott',
        type: 'artist',
        uri: 'spotify:artist:0DxPHf2flBAcV2SnZPg3SV',
      },
    ],
    available_markets: [
      'AD',
      'AE',
      'AR',
      'AT',
      'AU',
      'BE',
      'BG',
      'BH',
      'BO',
      'BR',
      'CA',
      'CH',
      'CL',
      'CO',
      'CR',
      'CY',
      'CZ',
      'DE',
      'DK',
      'DO',
      'DZ',
      'EC',
      'EE',
      'EG',
      'ES',
      'FI',
      'FR',
      'GB',
      'GR',
      'GT',
      'HK',
      'HN',
      'HU',
      'ID',
      'IE',
      'IL',
      'IN',
      'IS',
      'IT',
      'JO',
      'JP',
      'KW',
      'LB',
      'LI',
      'LT',
      'LU',
      'LV',
      'MA',
      'MC',
      'MT',
      'MX',
      'MY',
      'NI',
      'NL',
      'NO',
      'NZ',
      'OM',
      'PA',
      'PE',
      'PH',
      'PL',
      'PS',
      'PT',
      'PY',
      'QA',
      'RO',
      'SA',
      'SE',
      'SG',
      'SK',
      'SV',
      'TH',
      'TN',
      'TR',
      'TW',
      'US',
      'UY',
      'VN',
      'ZA',
    ],
    disc_number: 1,
    duration_ms: 184440,
    explicit: false,
    external_ids: {
      isrc: 'QM24S1926086',
    },
    external_urls: {
      spotify: 'https://open.spotify.com/track/55p8TQ1ggGYOO1gLQrC52D',
    },
    href: 'https://api.spotify.com/v1/tracks/55p8TQ1ggGYOO1gLQrC52D',
    id: '55p8TQ1ggGYOO1gLQrC52D',
    is_local: false,
    name: 'Favorite T-Shirt',
    popularity: 67,
    preview_url:
      'https://p.scdn.co/mp3-preview/14744b1c7dec75b9aa24c412e1fa171abc1b7fca?cid=7b7276c9ce944b9c867110bdf866ffb0',
    track_number: 2,
    type: 'track',
    uri: 'spotify:track:55p8TQ1ggGYOO1gLQrC52D',
  };

  const singleTrack = (index, track) => {
    return (
      <div className="singleTrackInPlaylist">
        <p>
          <span>{index} -</span> {track.name}/ {track.album.name}/{' '}
          {track.artists[0].name}
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="page">
        <p>This is the detail page of a playlist</p>
        {singleTrack(1, exampleTrack)}
      </div>
    </>
  );
};

export default Playlist;
