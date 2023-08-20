import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'


const routes = [
  // Home
  {
    path: '/',
    name: 'Home',
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
    component: () => import (/* webpackChunkName: "shopping_cart" */ '@/views/BuyFormView.vue'),
    //vista protegida
    meta: {
      login: true
    }
  },
  // Orders List
  {
    path: '/orders',
    name: 'Orders',
    component: () => import (/* webpackChunkName: "orders" */ '@/views/OrdersView.vue'),
    //vista protegida
    meta: {
      login: true
    }
  },
  // SearchResult
  {
    path: '/search/:keyword',
    name: 'SearchResult',
    component: () => import (/* webpackChunkName: "search" */ '@/views/SearchResultView.vue'),    
    meta: {
      login: false
    }
  },
  // Dashboard
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import (/* webpackChunkName: "dashboard" */ '@/views/auth/DashboardView.vue'),    
    meta: {
      login: true
    }
  },
  // Login
  {
    path: '/login',
    name: 'Login',
    component: () => import (/* webpackChunkName: "login" */ '@/views/auth/LoginView.vue'),    
    meta: {
      login: false
    }
  },
  // Register
  {
    path: '/register',
    name: 'Register',
    component: () => import (/* webpackChunkName: "register" */ '@/views/auth/RegisterView.vue'),    
    meta: {
      login: false
    }
  },
  // Reset Password
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import (/* webpackChunkName: "reset_password" */ '@/views/auth/ResetPasswordView.vue'),    
    meta: {
      login: true
    }
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
    return next({name: 'NotFound'})

  const authStore = useAuthStore();  
  const loggedIn = !!authStore.is_login;
  
  const isProtected = to.matched.some(route => route.meta.login)
  
  if(isProtected && !loggedIn)
    return next({name: 'Login'})

  next()
})

export default router
