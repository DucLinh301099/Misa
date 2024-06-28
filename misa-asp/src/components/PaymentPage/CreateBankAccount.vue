<template>
  <div class="create-bank-account">
    <h2 class="form-title">Thêm Tài khoản ngân hàng</h2>
    <form @submit.prevent="createBankAccount">
      <div class="form-row">
        <div class="input-container">
          <label for="account-number">
            Số tài khoản <span class="required">*</span>
          </label>
          <input
            type="text"
            id="account-number"
            v-model="accountNumber"
            class="input-field"
            required
          />
        </div>
        <div class="input-container">
          <label for="bank-name">
            Tên ngân hàng <span class="required">*</span>
          </label>
          <input
            type="text"
            id="bank-name"
            v-model="bankName"
            class="input-field"
            required
          />
        </div>
        <div class="input-container">
          <label for="branch">
            Chi nhánh <span class="required">*</span>
          </label>
          <input
            type="text"
            id="branch"
            v-model="branch"
            class="input-field"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-container full-width">
          <label for="account-type">Loại tài khoản</label>
          <select id="account-type" v-model="roleId" class="input-field">
            <option value="1">Tài khoản chi</option>
            <option value="2">Tài khoản nhận</option>
          </select>
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
import { createBankAccount } from "../../api/bank"; // Import hàm tạo tài khoản ngân hàng từ file account.js

export default {
  name: "CreateBankAccount",
  data() {
    return {
      accountNumber: "",
      bankName: "",
      branch: "",
      roleId: "",
      generalError: "",
    };
  },
  methods: {
    async createBankAccount() {
      try {
        console.log("Attempting to create bank account...");
        const data = await createBankAccount(
          this.accountNumber,
          this.bankName,
          this.branch,
          this.roleId
        );
        console.log("Tạo mới tài khoản ngân hàng thành công:", data);
        alert("Tạo mới tài khoản ngân hàng thành công!");
        this.$router.push("/payment"); // Điều hướng đến trang danh sách tài khoản ngân hàng sau khi tạo thành công
      } catch (error) {
        console.error("Lỗi khi tạo mới tài khoản ngân hàng:", error);
        this.generalError = error.message;
      }
    },
  },
};
</script>

<style scoped>
.create-bank-account {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
}

.form-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
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
  margin-bottom: 5px;
}

.required {
  color: red;
}

.input-field {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
