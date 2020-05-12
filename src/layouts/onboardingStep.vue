<template>
    <span>
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
    </span>
</template>
<script>

export default {
  props: {
    step: { type: Object },
  },
  name: 'onboardingStep',
};
</script>

<style scoped>
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

.description {
  margin-bottom: 2em;
}

</style>
