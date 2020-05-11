<template>
  <q-card class="onboarding-card">
    <q-card-title>
      <div class="text-center">Welcome to Coach Logic!</div>
    </q-card-title>
    <q-card-separator />
    <q-card-main>
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
          :name="step.title"
          active-icon="expand_more"
        >

        <div class="q-body-1 description">{{step.description}}</div>

          <div v-if="step.videoUrl" class="iframe-container">
            <iframe
              :src="step.videoUrl"
              class="responsive-iframe"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              width="560" height="315"
            />
          </div>
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
          label="Next"
          />
        </q-stepper-navigation>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import getOnboardingSteps, { setLocalStorageValue } from './onboarding.config.js';

const userType = 'Coach';
// const userType = 'Player';
// const userType = 'Community';

export default {
  name: 'onboarding',
  data() {
    return {
      steps: getOnboardingSteps(userType),
    };
  },
  methods: {
    handleNextClick() {
      console.log(this.$refs.stepper);
      setLocalStorageValue(this.$refs.stepper.step);
      this.$refs.stepper.next();
    },
    handleSkipTour() {
      setLocalStorageValue('hasSkipped');
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

    const stepName = this.$refs.stepper.steps[consecutiveSteps].title;
    this.$refs.stepper.goToStep(stepName);
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
