import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Home || ProductList
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/ListProduct.vue')
  },
  // ProductDetail
  {
    path: '/products/:keyword',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "product_detail" */ '@/views/ProductDetail.vue')
  },
  // Cart
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: () => import (/* webpackChunkName: "shopping_cart" */ '@/views/ShoppingCart.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
