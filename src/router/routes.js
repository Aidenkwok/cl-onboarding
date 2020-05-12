const routes = [
  {
    path: '/',
    component: () => import('layouts/onboardingStepper.vue'),
  },
  {
    path: '/modal',
    component: () => import('layouts/onboardingStepperModal.vue'),
  },
  {
    path: '/single-step',
    component: () => import('layouts/onboardingStepModal.vue'),
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
