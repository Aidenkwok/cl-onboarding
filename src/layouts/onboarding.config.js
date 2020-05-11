
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

const allSteps = [
  videoUpload,
  inviteUsers,
  sendClips,
  createPost,
  searchClips,
  createPlaylist,
  starItem,
];

// ****** Config for user type: Coach, Player or Community ******
const CoachConfig = [videoUpload, inviteUsers, sendClips, createPost];
const PlayerConfig = [createPost, sendClips, searchClips, createPlaylist];
const CommunityConfig = [starItem, createPost, searchClips, createPlaylist];

const createLocalStorageItem = () => {
  const defaultstate = allSteps.reduce(
    (acc, { title }) => ({ ...acc, [title]: null }
    ), { hasSkipped: false },
  );
  window.localStorage.setItem('onboarding', JSON.stringify(defaultstate));
  return defaultstate;
};

// set the relevant localstorage values to false based on usertype.
// if value = null, the step  is not relevant for the user
// True or False if user has complete that step.
const setUserTypeSteps = (onboardingData, config) => {
  const updatedOnboardingData = onboardingData;
  config.forEach(({ title }) => {
    if (updatedOnboardingData[title] === null) {
      updatedOnboardingData[title] = false;
    }
  });
  window.localStorage.setItem('onboarding', JSON.stringify(updatedOnboardingData));
  return updatedOnboardingData;
};

export function setLocalStorageValue(key) {
  const onboardingData = window.localStorage.getItem('onboarding');
  window.localStorage.setItem('onboarding', JSON.stringify({ ...JSON.parse(onboardingData), [key]: true }));
}

export default function getOnboardingSteps(userType) {
  let onboardingData = JSON.parse(window.localStorage.getItem('onboarding')) || null;

  // if there's no onboarding data in localstorage,
  // create a new item in localstorage with all values equal to null
  if (onboardingData === null) {
    onboardingData = createLocalStorageItem();
  }

  switch (userType) {
    case 'Coach': {
      setUserTypeSteps(onboardingData, CoachConfig);
      return CoachConfig;
    }

    case 'Player':
      setUserTypeSteps(onboardingData, PlayerConfig);
      return PlayerConfig;

    case 'Community':
    default:
      setUserTypeSteps(onboardingData, CommunityConfig);
      return CommunityConfig;
  }
}
