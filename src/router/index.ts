import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Settings from "../views/Settings.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Inbox'
  },
  {
    path: "/Settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
