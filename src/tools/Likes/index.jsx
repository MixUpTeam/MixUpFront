import React from 'react';
import APIManager from "services/APIManager";


const Likes = async (track_id) => {
  console.log(track_id);
  const res = await APIManager.upVote(track_id);
      console.log(res);  
      return (
    <>
    </>
  );
};

export default Likes;