import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';
import ForgotPasswordComponent from '../components/ForgotPasswordComponent.vue';
import AdminComponent from '../components/AdminComponent.vue'; // Import AdminComponent
import UserComponent from '../components/UserComponent.vue'; // Import UserComponent

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/admin', component: AdminComponent, meta: { requiresAuth: true, role: 'Admin' } },  // Add route for AdminComponent
  { path: '/user', component: UserComponent, meta: { requiresAuth: true, role: 'User' } },  // Add route for UserComponent
  { path: '/forgot-password', component: ForgotPasswordComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware để kiểm tra xác thực và phân quyền
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Lấy vai trò người dùng từ localStorage

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    return next('/login'); // Chuyển hướng đến trang đăng nhập nếu vai trò không khớp
  }

  next();
});

export default router;
