import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Home
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
  },
  // ListProduct (Categories)
  {
    path: '/products/:keyword',
    name: 'ListProduct',
    component: () => import(/* webpackChunkName: "product_list" */ '@/views/ListProductView.vue')
  },
  // ProductDetail
  {
    path: '/product/:keyword',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "product_detail" */ '@/views/ProductDetailView.vue')
  },
  // Cart
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: () => import (/* webpackChunkName: "shopping_cart" */ '@/views/ShoppingCartView.vue')
  },
  // Buy Form
  {
    path: '/buyform',
    name: 'BuyForm',
    component: () => import (/* webpackChunkName: "shopping_cart" */ '@/views/BuyFormView.vue')
  },
  // Booking List
  {
    path: '/bookings',
    name: 'Bookings',
    component: () => import (/* webpackChunkName: "bookings" */ '@/views/BookingsView.vue')
    //vista protegida
  },
  // Booking Detail
  {
    path: '/booking/:keyword',
    name: 'BookingDetail',
    component: () => import (/* webpackChunkName: "booking_detail" */ '@/views/BookingDetailView.vue')
    //vista protegida
  },
  // Not Found
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import (/* webpackChunkName: "not_found" */ '@/views/NotFoundView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Redirigir a NotFound sino existe la ruta
router.beforeEach((to, from, next) => {  
  if(to.matched.length === 0)
    next({name: 'NotFound'})
  else
    next()
})

export default router
