<template>
  <div class="create-employee">
    <h2 class="form-title">Thông tin nhân viên</h2>
    <form @submit.prevent="createEmployee">
      <div class="form-row">
        <div class="input-container">
          <label for="employee-code">Mã nhân viên</label>
          <input
            type="text"
            id="employee-code"
            v-model="employeeCode"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="employee-name">Tên nhân viên</label>
          <input
            type="text"
            id="employee-name"
            v-model="employeeName"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="department">Đơn vị</label>
          <input
            type="text"
            id="department"
            v-model="department"
            class="input-field"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-container full-width">
          <label for="mobile-phone">ĐT di động</label>
          <input
            type="text"
            id="mobile-phone"
            v-model="mobilePhone"
            class="input-field"
          />
        </div>
      </div>
      <div v-if="generalError" class="error-message">{{ generalError }}</div>
      <div class="form-actions">
        <button type="button" class="btn cancel-btn" @click="$emit('close')">
          Hủy
        </button>
        <button type="submit" class="btn submit-btn">Cất và Thêm</button>
      </div>
    </form>
  </div>
</template>

<script>
import { createEmployee } from "../../api/account"; // Import hàm tạo nhân viên từ file account.js

export default {
  name: "CreateEmployee",
  data() {
    return {
      employeeCode: "",
      employeeName: "",
      department: "",
      mobilePhone: "",
      generalError: "",
    };
  },
  methods: {
    async createEmployee() {
      try {
        console.log("Attempting to create employee...");
        const data = await createEmployee(
          this.employeeCode,
          this.employeeName,
          this.department,
          this.mobilePhone
        );
        console.log("Tạo mới nhân viên thành công:", data);
        alert("Tạo mới nhân viên thành công!");
        this.$router.push("/payment"); // Điều hướng đến trang danh sách nhân viên sau khi tạo thành công
      } catch (error) {
        console.error("Lỗi khi tạo mới nhân viên:", error);
        this.generalError = error.message;
      }
    },
  },
};
</script>

<style scoped>
.create-employee {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  max-width: 900px;
  margin: auto;
}

.form-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;
}

.input-container.full-width {
  flex: 0 0 100%;
  margin-right: 0;
}

.input-container:last-child {
  margin-right: 0;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

.input-field {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.input-field:focus {
  border-color: #28a745;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.cancel-btn {
  background-color: #ccc;
  margin-right: 10px;
}

.submit-btn {
  background-color: #28a745;
  color: white;
}

.submit-btn:hover {
  background-color: #218838;
}

.error-message {
  color: red;
  margin-bottom: 20px;
}
</style>
