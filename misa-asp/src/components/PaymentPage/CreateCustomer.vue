<!-- src/components/CreateCustomer.vue -->
<template>
  <div class="create-customer">
    <h2 class="form-title">Thông tin nhà cung cấp</h2>
    <form @submit.prevent="createCustomer">
      <div class="form-row">
        <div class="input-container">
          <label for="object-id">Đối tượng</label>
          <input
            type="text"
            id="object-id"
            v-model="objectId"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="object-name">Tên đối tượng</label>
          <input
            type="text"
            id="object-name"
            v-model="objectName"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="tax-code">Mã số thuế</label>
          <input
            type="text"
            id="tax-code"
            v-model="taxCode"
            class="input-field"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-container full-width">
          <label for="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            v-model="address"
            class="input-field"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-container full-width">
          <label for="phone">Điện thoại</label>
          <input
            type="text"
            id="phone"
            v-model="phoneNumber"
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
import { CreateCustomer } from "../../api/customer";

export default {
  name: "CreateCustomer",
  data() {
    return {
      objectId: "",
      objectName: "",
      taxCode: "",
      address: "",
      phoneNumber: "",
      generalError: "",
    };
  },
  methods: {
    async createCustomer() {
      try {
        console.log("Attempting to create customer...");
        const data = await CreateCustomer(
          this.objectId,
          this.objectName,
          this.taxCode,
          this.address,
          this.phoneNumber
        );
        console.log("Tạo mới Customer thành công:", data);
        alert("Tạo mới Customer thành công!");
        this.$router.push("/payment");
      } catch (error) {
        console.error("Lỗi khi tạo mới Customer:", error);
        this.generalError = error.message;
      }
    },
  },
};
</script>

<style scoped>
.create-customer {
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
