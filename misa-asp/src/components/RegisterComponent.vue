<template>
  <div class="register-page">
    <div class="register-container">
      <div class="logo-section-register">
        <router-link to="/">
          <img
            src="https://asp.misa.vn/Content/Images/SVG/Logo.svg"
            alt="MISA ASP Logo" class="main-logo2" />
        </router-link>
      </div>
      <div class="main-title mt-3">
        <div class="row">
          <div class="col-6-1">
            <span class="bold">Đăng Ký</span>
          </div>
          <div class="col-6-2">
            <img src="https://asp.misa.vn/App/Content/images/Logo2.png" class="float-right">
          </div>
        </div>
      </div>
      <form @submit.prevent="register">
        <div class="form-group-inline">
          <div class="form-group">
            <input type="text" v-model="firstName" placeholder="Họ và đệm" required />
          </div>
          <div class="form-group">
            <input type="text" v-model="lastName" placeholder="Tên" required />
          </div>
        </div>
        <div class="form-group">
          <input type="text" v-model="email" placeholder="Email" required />
          <div v-if="errors.Email" class="error">{{ errors.Email }}</div>
        </div>
        <div class="form-group">
          <input type="text" v-model="phoneNumber" placeholder="Số điện thoại" required />
          <div v-if="errors.PhoneNumber" class="error">{{ errors.PhoneNumber }}</div>
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Mật khẩu" required />
        </div>
        <div class="form-group">
          <select v-model="roleId" required>
            <option value="" disabled>Chọn quyền</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
          </select>
        </div>
        <p class="disclaimer">
          Bằng cách bấm vào nút Nhận tư vấn miễn phí, bạn đã đồng ý với <a href="https://www.misa.vn/privacy/">Chính sách quyền riêng tư</a> của MISA.
        </p>
        <button type="submit" class="register-button">Đăng ký</button>
        <div v-if="generalError" class="error">{{ generalError }}</div>
        <div class="extra-links">
          <p>Bạn đã có tài khoản? <router-link to="/login">Đăng Nhập</router-link></p>
          <p><router-link to="/href">Trợ giúp</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { register } from '../api/account';
import '../assets/css/register.css';

export default {
  name: 'RegisterComponent',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      roleId: '',
      errors: {},
      generalError: ''
    };
  },
  methods: {
    async register() {
      try {
        console.log('Sending request to register user...');
        const data = await register(this.firstName, this.lastName, this.email, this.phoneNumber, this.password, this.roleId);
        console.log('User registered:', data);
        alert('Registration successful!');
        this.$router.push('/login');
      } catch (error) {
        console.error('There was an error registering the user:', error);
        this.errors = {};
        this.generalError = '';

        // Handle specific validation errors
        if (error.message.includes('Email error')) {
          this.errors.Email = error.message.split(', ').find(msg => msg.includes('Email error'));
        }
        if (error.message.includes('Phone number error')) {
          this.errors.PhoneNumber = error.message.split(', ').find(msg => msg.includes('Phone number error'));
        }

        // Handle general error
        if (!this.errors.Email && !this.errors.PhoneNumber) {
          this.generalError = error.message;
        }
      }
    }
  }
};
</script>
