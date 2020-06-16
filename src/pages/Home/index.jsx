import React from 'react';
import bgVideo from 'assets/videos/home-bg.mp4';

const Home = () => {
  console.log('in home page');
  return (
    <>
      <div className="page">
        <video
          playsinline="playsinline"
          autoPlay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>A HUGE SLOGAN</p>
        <p>present the product</p>
        <p>huge CTA</p>
      </div>
    </>
  );
};

export default Home;
