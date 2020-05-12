import { allSteps, allConfigs } from './onboarding.config';


// settings all values to null in localstorage
const createLocalStorageItem = () => {
  const defaultState = Object.keys(allSteps).reduce(
    (acc, key) => ({ ...acc, [key]: null }
    ), { },
  );
  window.localStorage.setItem('onboarding', JSON.stringify(defaultState));
  return defaultState;
};

// set the relevant localstorage values to false based on usertype.
// if value = null, the step  is not relevant for the user
// True or False if user has complete that step.
const setUserTypeSteps = (onboardingData, config) => {
  const updatedOnboardingData = onboardingData;
  config.forEach(({ id }) => {
    if (updatedOnboardingData[id] === null) {
      updatedOnboardingData[id] = false;
    }
  });
  window.localStorage.setItem('onboarding', JSON.stringify(updatedOnboardingData));
  return updatedOnboardingData;
};

export function setLocalStorageValue(key) {
  const onboardingData = window.localStorage.getItem('onboarding');
  window.localStorage.setItem('onboarding', JSON.stringify({ ...JSON.parse(onboardingData), [key]: true }));
}

// check if the user has completed the onboarding relevant to their usertype
export function hasCompletedOnboarding(userType) {
  if (!userType) {
    return false;
  }
  const steps = allConfigs[userType];
  const onboardingData = JSON.parse(window.localStorage.getItem('onboarding')) || null;
  if (onboardingData) {
    return steps.every(({ id }) => onboardingData[id]);
  }
  return false;
}

// get the correct steps depending on userType
// and also settings those values to false in localstorage
export default function getOnboardingSteps(userType) {
  let onboardingData = JSON.parse(window.localStorage.getItem('onboarding')) || null;
  // if there's no onboarding data in localstorage
  // create a new item in localstorage with all values equal to null
  if (onboardingData === null) {
    onboardingData = createLocalStorageItem();
  }

  const steps = allConfigs[userType];
  setUserTypeSteps(onboardingData, steps);
  return steps;
}
