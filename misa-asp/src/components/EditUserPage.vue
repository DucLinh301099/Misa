<template>
  <div class="edit-user-page">
    <div class="edit-user-container">
      <h2>Chỉnh Sửa Thông Tin Người Dùng</h2>
      <form @submit.prevent="saveUser" v-if="editingUser">
        <div class="form-group">
          <label>Họ Tên</label>
          <input type="text" v-model="editingUser.firstName" required>
        </div>
        <div class="form-group">
          <label>Tên</label>
          <input type="text" v-model="editingUser.lastName" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="editingUser.email" required>
        </div>
        <div class="form-group">
          <label>Số Điện Thoại</label>
          <input type="text" v-model="editingUser.phoneNumber" required>
        </div>
        <button type="submit">Lưu</button>
        <button type="button" @click="cancelEdit">Hủy</button>
      </form>
      <div v-else class="loading-message">
        Đang tải dữ liệu người dùng...
      </div>
    </div>
  </div>
</template>


<script>
import { updateUser, fetchUserById } from '../api/account';

export default {
  name: 'EditUserPage',
  props: ['id'],
  data() {
    return {
      editingUser: null,
    };
  },
  async created() {
    try {
      const response = await fetchUserById(this.id);
      this.editingUser = response;
    } catch (error) {
      console.error('Error fetching user:', error);
      alert('Failed to fetch user data: ' + (error.response ? error.response.data.message : error.message));
    }
  },
  methods: {
    async saveUser() {
      try {
        await updateUser(this.editingUser);
        alert('User updated successfully!');
        this.$router.push('/admin');
      } catch (error) {
        console.error('Error saving user:', error);
        alert('Failed to update user: ' + error.message);
      }
    },
    cancelEdit() {
      this.$router.push('/admin');
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
.edit-user-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
  font-family: AvertaStdCY, Helvetica, Tahoma, Arial, sans-serif;
}

.edit-user-container {
  background-color: #fff;
  padding: 20px 40px 40px 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  text-align: left;
  font-size: 14px;
  color: #333;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

button[type="submit"],
button[type="button"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button[type="button"] {
  background-color: #f44336;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  opacity: 0.9;
}

button[type="button"] {
  background-color: #f44336;
}

.loading-message {
  color: #fff;
  font-size: 18px;
}

</style>
