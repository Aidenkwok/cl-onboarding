
<template>
  <q-dialog
    class="onboarding-step-modal"
    v-model="modelIsOpen"
    prevent-close
    :ok="false"
  >
   <div class="modal-wrapper" slot="body">
       <p class="q-display-1">{{step.title}}</p>
        <onboardingStep :step="step"/>
        <q-btn
            class="full-width close-btn"
            color="primary"
            label="Got it!"
        />
    </div>
  </q-dialog>
</template>

<script>
import onboardingStep from './onboardingStep.vue';
import { getSingleStep } from './onboarding.config';

const stepName = 'Invite Users';

export default {
  name: 'onbordingStepModal',
  components: {
    onboardingStep,
  },
  data() {
    return {
      modelIsOpen: true,
      name: 'OnboardingStepModal',
      step: {},
    };
  },
  methods: {
    closeModal() {
      this.modelIsOpen = false;
    },
  },
  mounted() {
    this.step = getSingleStep(stepName);
  },
};
</script>

<style scoped>
.onboarding-step-modal >>> .modal-scroll{
  max-height: min-content;
}

.onboarding-step-modal >>> .modal-content{
  max-height: 90vh;
  padding: 0;
}

.onboarding-step-modal >>> .onboarding-card{
  box-shadow: none;
}

.modal-wrapper {
    padding: 2em;
}

.close-btn {
    margin-top: 1em;
}

</style>
