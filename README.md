### MixUp, a collaborative music playlist based on Spotify

demo [here](https://mix-up-front.vercel.app/)

MixUp is your democratic solution to have a music playlist with which everybody is happy. The principal is simple: you have a list of musical tracks, people vote over these tracks, the one receiving most votes goes on top of the queue, and gets played in the first place. Votes can happen when a piece of music is played. When it is over, the one having highest vote among the rest gets played next.

Oh, did we mention? You can up vote OR down vote on a piece of music. Your down vote subtracts 1 from the total score.

MixUp exists also as PWA.

* * *

NOTES AT FRIDAY 23:44

We need to manually update a token every 60 minutes for the music to actually play. Everything else is possible without this token.

* * *

Currently available user experience

1. see the home page
2. sign in, sign up or get redirected to sign in if click on new playlist button
3. once signed in, access the new playlist page, type a name and create a playlist, get redirected to the page
4. add tracks to a playlist
5. vote on tracks to see the ranking change (on realtime only for the user. Other users' action is not broadcasted)
6. having 30 secs preview for the music (because we don't have a premium account)
7. click on the share button to copy url of this page


* * *

Stack and tools

- Front: React.js, redux, axios, Spotify public API, react-spotify-web-playback
- Back: rails 6.0.3, ruby 2.7.1, gem acts_as_votable: gem devise-jwt
- DevOps: Heroku, Vercel, Travis, Rspec
- Project management: Github project board, github for Slack

The front app interacts with both Spotify API (for any musical information on a track, and for the music player) and our back API (for composing playlists, counting votes and user auth).

* * *

Challenges

1. Collecting information half from back, half from Spotify and linking the information on the same piece of music. We had a long discussion on the architecture. We may not be totally happy with our initial choice, but we couldn't have foreseen everything.
2. Error handling with axios (that we discovered). 
3. Retrieving the actual music, getting the end.

Unresolved issues

1. testing that devise-jwt actually sends a token, and testing API request with header

## Authors

-   **@floriansr** - (https://github.com/floriansr)
-   **@julienemo** - (https://github.com/julienemo)
-   **@raphaelchpprt**  - (https://github.com/raphaelchpprt)
-   **@ylaifa**  - (https://github.com/ylaifa)
