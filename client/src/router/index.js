import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddCustomer from '../views/AddCustomer.vue'
import EditCustomer from '../views/EditCustomer.vue'
import Document from '../views/Document.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/add-customer',
    name: 'add-customer',
    component: AddCustomer
  },
  {
    path: '/customer/:id',
    name: 'edit-customer',
    component: EditCustomer
  },
  {
    path: '/document',
    name: 'document',
    component: Document
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
