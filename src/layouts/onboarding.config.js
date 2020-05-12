
// ****** Config for each step ******
const videoUpload = { title: 'Upload a Video', id: 'videoUpload' };

const inviteUsers = {
  title: 'Invite Users',
  id: 'inviteUsers',
  videoUrl: 'https://www.youtube.com/embed/SWIzUHTPTRQ',
  description: 'You can get the most of Coach Logic with more members on your platform 😎',
};

const sendClips = { title: 'Send Clips', id: 'sendClips' };

const createPost = { title: 'Create Post', id: 'createPost' };

const searchClips = { title: 'Search Clips', id: 'searchClips' };

const createPlaylist = { title: 'Create Playlist', id: 'createPlaylist' };

const starItem = { title: 'Star Items', id: 'starItem' };


// ****** All Steps together ******
const allSteps = {
  videoUpload,
  inviteUsers,
  sendClips,
  createPost,
  searchClips,
  createPlaylist,
  starItem,
};

// ****** Config for user type: Coach, Player or Community ******
const CoachConfig = [videoUpload, inviteUsers, sendClips, createPost];
const PlayerConfig = [createPost, sendClips, searchClips, createPlaylist];
const CommunityConfig = [starItem, createPost, searchClips, createPlaylist];

export {
  allSteps, CoachConfig, PlayerConfig, CommunityConfig,
};
