import React from 'react';
import './styles.scss';
import bgVideo from '../../assets/videos/home-bg.mp4';
import NewPlaylistButton from '../../components/NewPlaylistButton';

const Home = () => {
  return (
    <>
      <div className="page home">
        <video
          playsInline="playsinline"
          autoPlay="autoplay"
          muted="muted"
          loop="loop"
          id="homePageVideoBg"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="homePageContent">
          <div className="overFlowText">
            <p className="slogan">The best collective playlists</p>
            <p className="productPresentation">
              Invite your friends to collaborate to your playlists
              <br /> and let them vote for the songs they want to hear!
            </p>
            <NewPlaylistButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
