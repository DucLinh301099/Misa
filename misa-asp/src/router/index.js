import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';
import ForgotPasswordComponent from '../components/ForgotPasswordComponent.vue';
import AdminComponent from '../components/AdminComponent.vue'; // Import AdminComponent

import EditUserPage from '../components/EditUserPage.vue'; // Import EditUserPage
import CreateUserComponent from '../components/CreateUserComponent.vue'; // Import CreateUserComponent
import UserAccount from '../views/UserAccount.vue';
import Payment from '../views/Payment.vue';
import CreateBankAccount from '../components/CreateBankAccount.vue';
import CreateSupplier from '../components/CreateSupplier.vue';
import CreateEmployee from '../components/CreateEmployee.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/admin', component: AdminComponent, meta: { requiresAuth: true, role: 'Admin' } },  // Add route for AdminComponent
  { path: '/userAccount', component: UserAccount, meta: { requiresAuth: true, role: 'User' } },  // Add route for UserComponent
  { path: '/edit-user/:id', component: EditUserPage, meta: { requiresAuth: true, role: 'Admin' }, props: true },
  { path: '/payment', component: Payment, meta: { requiresAuth: true, role: 'Admin' } },
  { path: '/forgot-password', component: ForgotPasswordComponent },
  { path: '/create-user', component: CreateUserComponent, meta: { requiresAuth: true, role: 'Admin' } },
  { path: '/create-bank-account', component: CreateBankAccount, meta: { requiresAuth: true, role: 'Admin' } },
  { path: '/create-supplier', component: CreateSupplier, meta: { requiresAuth: true, role: 'Admin' } },
  { path: '/create-employee', component: CreateEmployee, meta: { requiresAuth: true, role: 'Admin' } },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware to check authentication and authorization
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Get user role from localStorage

  // if (authRequired && !loggedIn) {
  //   return next('/login');
  // }

  if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    return next('/login'); // Redirect to login if the role does not match
  }

  next();
});

export default router;
