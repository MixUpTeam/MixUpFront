import React from "react";
import "./styles.scss";
import bgVideo from "assets/videos/home-bg.mp4";

const Home = () => {
  console.log("in home page");
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
          Your browserdiv does not support the video tag.
        </video>
        <div className="homePageContent">
          <div className="overFlowText">
            <p className="slogan">Always target higher </p>
            <p className="productPresentation">
              Harry étouffa à grand-peine une exclamation. Les Dursley faisaient
              preuve d’une étonnante bêtise lorsqu’il s’agissait de leur fils
              Dudley
            </p>
            <p>CTA coming soon</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
