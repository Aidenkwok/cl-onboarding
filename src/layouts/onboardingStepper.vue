<template>
  <q-card class="onboarding-card">
    <q-card-title>
      <div class="text-center">Welcome to Coach Logic!</div>
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      <span v-if="!showFinishScreen">
        <q-stepper

          alternative-labels
          ref="stepper"
          class="onboarding-stepper"
        >
          <q-step
            v-for="step in steps"
            :key="step.title"
            :title="step.title"
            :subtitle="step.subtitle"
            :name="step.id"
            active-icon="expand_more"
          >
            <onboardingStep :step="step"/>
          </q-step>
        </q-stepper>
        <div>

          <q-stepper-navigation>
            <q-btn
              @click="handleSkipTour"
              class="skip-tour-btn"
              label="Skip Tour"
              outline
              color="primary"
            >
              <q-tooltip anchor="bottom middle" self="top middle">
                Don't worry, you can come back to this later ✌️
            </q-tooltip>
            </q-btn>
            <q-btn
            @click="handleNextClick"
            color="primary"
            label="next"
            />
          </q-stepper-navigation>
        </div>
      </span>
      <span class="finish-tour-screen" v-else>
        <p class="q-subheading">
          Great! Now you know the basics of Coach Logic.
          If you have any questions then feel free to come back to this tour later on
          from the help button or contact support.
          </p>
            <q-btn
            class="full-width"
            @click="handleFinishTour"
            color="primary"
            label="Finish"
          />
      </span>
    </q-card-main>
  </q-card>
</template>

<script>
import getOnboardingSteps, { setLocalStorageValue } from './onboardingFunctions';
import onboardingStep from './onboardingStep';

const userType = 'coach';
// const userType = 'player';
// const userType = 'community';

export default {
  components: {
    onboardingStep,
  },
  props: {
    onFinishTour: { type: Function },
    onSkipTour: { type: Function },
  },
  name: 'onboarding',
  data() {
    return {
      steps: getOnboardingSteps(userType),
      showFinishScreen: false,
    };
  },
  methods: {
    handleNextClick() {
      const { stepper } = this.$refs;
      // set the step to true in localstorage
      setLocalStorageValue(stepper.step);

      // if the user is about to complete the last step
      if (stepper.currentStep.last) {
        this.showFinishScreen = true;
      }

      stepper.next();
    },
    handleSkipTour() {
      setLocalStorageValue('hasSkipped');
      if (this.onSkipTour) {
        this.onSkipTour();
      }
    },
    handleFinishTour() {
      if (this.onFinishTour) {
        this.onFinishTour();
      }
    },
  },
  mounted() {
    // we set the progress of the stepper depeding on what is in localstorage
    const previousOnboardingData = JSON.parse(window.localStorage.getItem('onboarding'));
    let consecutiveSteps = 0;
    // checking for consecutive steps, eg, 1,2,3 and not 1,3,4
    // eslint-disable-next-line no-plusplus
    for (let x = 0; x < this.steps.length; x++) {
      if (previousOnboardingData[this.steps[x].title] === true && x === consecutiveSteps) {
        // eslint-disable-next-line no-plusplus
        consecutiveSteps++;
      } else { break; }
    }
    const { stepper } = this.$refs;

    // if the user hasn't already completed all steps
    if (consecutiveSteps !== stepper.length) {
      const stepName = stepper.steps[consecutiveSteps].title;
      stepper.goToStep(stepName);
    }
  },
};
</script>

<style scoped>
.q-stepper,
.q-stepper-header {
  box-shadow: none;
}
.onboarding-card {
  max-width: 650px;
}

.iframe-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.q-stepper.column {
  flex-wrap: initial;
}

.description {
  margin-bottom: 2em;
}

.skip-tour-btn {
  margin-right: 1em;
}

.onboarding-card >>> .alternative-labels {
  box-shadow: none;
  min-height: min-content;
}

.onboarding-card >>> .q-stepper-tab {
  padding: 1em;
}

</style>
