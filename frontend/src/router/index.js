import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Vote from '../components/Vote.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vote',
    name: 'Vote',
    component: Vote
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
