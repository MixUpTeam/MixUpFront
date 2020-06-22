import APIManager from 'services/APIManager';

const Likes = async (track_id, user_id) => {
  const res = await APIManager.upVote(track_id, user_id);
  return res;
};

export default Likes;
