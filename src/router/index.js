
import { createRouter, createWebHistory } from "vue-router";
import AboutUs from '../views/AboutUs.vue'
import Home from '../views/Home.vue'
import Score from '../views/Score.vue'

const history = createWebHistory()
const routes = [
  {
    path: "/aboutus",
    name: "About",
    component: AboutUs,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/scoreboard",
    name: "Score",
    component: Score,
  }
]
const router = createRouter({ history,routes })
export default router