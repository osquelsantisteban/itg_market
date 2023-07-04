import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/ListProduct.vue')
  },
  {
    path: '/products/:keyword',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "product_detail" */ '@/views/ProductDetail.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
