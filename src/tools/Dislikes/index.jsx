import APIManager from 'services/APIManager';

const Dislikes = async (track_id, user_id) => {
  const res = await APIManager.downVote(track_id, user_id);
  console.log(res);
  return res;
};

export default Dislikes;
