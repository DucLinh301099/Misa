<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo-section-login">
        <router-link to="/">
          <img
            src="https://asp.misa.vn/Content/Images/SVG/Logo.svg"
            alt="MISA ASP Logo" class="main-logo1" />
        </router-link>
      </div>
      <div class="main-title mt-3">
        <div class="row">
          <div class="col-6-1">
            <span class="bold">Đăng nhập</span>
          </div>
          <div class="col-6-2">
            <img src="https://asp.misa.vn/App/Content/images/Logo2.png" class="float-right">
          </div>
        </div>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <input type="text" v-model="emailOrPhoneNumber" placeholder="Số điện thoại/Email" required />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Mật khẩu" required />
        </div>
        <button type="submit" class="login-button">Đăng nhập</button>
      </form>
      <div class="extra-links">
        <p>Bạn chưa có tài khoản? <router-link to="/register">Đăng ký</router-link></p>
        <p><router-link to="/forgot-password">Quên mật khẩu?</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../api/account';
import '../assets/css/login.css';

export default {
  name: 'LoginComponent',
  data() {
    return {
      emailOrPhoneNumber: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        console.log('Sending request to login user...');
        const data = await login(this.emailOrPhoneNumber, this.password);
        console.log('User logged in:', data);
        const role = localStorage.getItem('role'); // Check role after storing
        const lastName = localStorage.getItem('lastName'); // Get lastName from localStorage
        console.log('Role from localStorage:', role);
        console.log('Last Name from localStorage:', lastName);

        if (role === 'Admin') {
          this.$router.push('/admin'); 
        } else {
          this.$router.push('/userAccount'); 
        }
      } catch (error) {
        console.error('There was an error logging in the user:', error);
        let errorMessage;
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Get error message from server
        } else {
          errorMessage = 'Tài khoản hoặc mật khẩu sai. Vui lòng thử lại.'; // General error message
        }
        alert(errorMessage); // Show error message with alert
      }
    }
  }
};
</script>
<style>
</style>