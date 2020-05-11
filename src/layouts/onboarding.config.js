
// ****** Config for each step ******
const videoUpload = { title: 'Upload a Video' };
const inviteUsers = {
  title: 'Invite Users',
  videoUrl: 'https://www.youtube.com/embed/SWIzUHTPTRQ',
  description: 'You can get the most of Coach Logic with more members on your platform 😎',
};
const sendClips = { title: 'Send Clips' };
const createPost = { title: 'Create Post' };
const searchClips = { title: 'Search Clips' };
const createPlaylist = { title: 'Create Playlist' };
const starItem = { title: 'Star Items' };

// ****** Config for user type: Coach, Player or Community ******
const CoachConfig = [videoUpload, inviteUsers, sendClips, createPost];
const PlayerConfig = [createPost, sendClips, searchClips, createPlaylist];
const CommunityConfig = [starItem, createPost, searchClips, createPlaylist];

export default function getOnboardingSteps(userType) {
  switch (userType) {
    case 'Coach':
      return CoachConfig;

    case 'Player':
      return PlayerConfig;

    case 'Community':
    default:
      return CommunityConfig;
  }
}
