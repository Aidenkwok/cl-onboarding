
<template>
  <q-dialog
    class="onboarding-modal"
    v-model="modelIsOpen"
    prevent-close
    :ok="false"
  >
   <div slot="body">
      <onboardingStepper :onFinishTour="closeModal" :onSkipTour="closeModal"/>
    </div>
  </q-dialog>
</template>

<script>
import onboardingStepper from './onboardingStepper.vue';

export default {
  name: 'onbordingStepperModal',
  components: {
    onboardingStepper,
  },
  data() {
    return {
      modelIsOpen: true,
      name: 'OnboardingModal',
    };
  },
  methods: {
    closeModal() {
      this.modelIsOpen = false;
    },
  },
};
</script>

<style scoped>
  .onboarding-modal >>> .modal-scroll{
    max-height: min-content;
  }

  .onboarding-modal >>> .modal-content{
    max-height: 90vh;
    padding: 0;
  }

  .onboarding-modal >>> .onboarding-card{
    box-shadow: none;
  }
</style>
