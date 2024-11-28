import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import PlayView from '../views/Play.vue'
import ScoreView from '../views/Score.vue'
import SettingsView from '../views/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/play',
      name: 'play',
      component: PlayView,
    },
    {
      path: "/score",
      name: "score",
      component: ScoreView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    }
  ],
})

export default router
