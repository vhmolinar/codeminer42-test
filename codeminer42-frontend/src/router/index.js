import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/dashboard/DashboardView.vue')
    },
    {
      path: '/patient/:patientId',
      name: 'patient',
      component: () => import('../views/patient/PatientView.vue')
    }
  ]
})

export default router
