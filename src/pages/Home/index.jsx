import React from 'react';
import './styles.scss';
import bgVideo from 'assets/videos/home-bg.mp4';
import NewPlaylistButton from 'components/NewPlaylistButton';

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
            <p className="slogan">Always target higher </p>
            <p className="productPresentation">
              Harry étouffa à grand-peine une exclamation. Les Dursley faisaient
              preuve d’une étonnante bêtise lorsqu’il s’agissait de leur fils
              Dudley
            </p>
            <NewPlaylistButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
