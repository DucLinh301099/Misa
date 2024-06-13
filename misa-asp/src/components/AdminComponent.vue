<template>
  <div class="admin-page">
    <div class="sidebar">
      <router-link to="/" class="logo">
        <img src="https://asp.misa.vn/Content/Images/SVG/Logo.svg" alt="Logo" />
      </router-link>
      <ul class="menu">
        <li><router-link to="/dashboard"><i class="fa fa-tachometer"></i> Dashboard</router-link></li>
        <li><router-link to="/user"><i class="fa fa-users"></i> User</router-link></li>
        <li><router-link to="/user-profile"><i class="fa fa-user"></i> User Profile</router-link></li>
        <li><router-link to="/account"><i class="fa fa-credit-card"></i> Account</router-link></li>
        <li><router-link to="/charts"><i class="fa fa-bar-chart"></i> Charts</router-link></li>
        <li><router-link to="/forms"><i class="fa fa-pencil"></i> Forms</router-link></li>
        <li><router-link to="/apps"><i class="fa fa-th"></i> Apps</router-link></li>
        <li><router-link to="/maps"><i class="fa fa-map"></i> Maps</router-link></li>
        <li><router-link to="/pages"><i class="fa fa-file"></i> Pages</router-link></li>
      </ul>
    </div>
    <div class="content">
      <div class="header">
        <h1>Dashboard</h1>
      </div>
      <div class="search-create-container">
        <div class="search-box">
          <input type="text" v-model="searchQuery" @input="searchUsers" placeholder="Tìm Kiếm ">
        </div>
        <div class="create-user">
          <button class="create-button" @click="createUser">
            <i class="fa fa-user-plus"></i> Tạo mới User
          </button>
        </div>
      </div>
      <table class="user-table">
        <thead>
          <tr>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.roleName }}</td>
            <td>
              <button @click="editUser(user.id)">Sửa</button>
              <button @click="deleteUser(user.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { deleteUserById, fetchProtectedData } from '../api/account';
import '../assets/css/admin.css';

export default {
  name: 'AdminComponent',
  data() {
    return {
      users: [],
      searchQuery: '',
    };
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        const response = await fetchProtectedData();
        this.users = response;
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch user data: ' + (error.response ? error.response.data.message : error.message));
      }
    },
    searchUsers() {
      
    },
    createUser() {
      this.$router.push({ path: `/create-user` });
    },
    editUser(userId) {
      this.$router.push({ path: `/edit-user/${userId}` });
    },
    async deleteUser(id) {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await deleteUserById(id);
          this.users = this.users.filter(user => user.id !== id);
          alert('User deleted successfully!');
        } catch (error) {
          console.error('Error deleting user:', error);
          alert('Failed to delete user: ' + error.message);
        }
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');


</style>
