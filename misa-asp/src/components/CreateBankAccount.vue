<template>
  <div class="create-bank-account">
    <h2 class="form-title">Thêm Tài khoản ngân hàng</h2>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="input-container">
          <label for="account-number"
            >Số tài khoản <span class="required">*</span></label
          >
          <input
            type="text"
            id="account-number"
            v-model="accountNumber"
            class="input-field"
            required
          />
        </div>
        <div class="input-container">
          <label for="bank-name"
            >Tên ngân hàng <span class="required">*</span></label
          >
          <select
            id="bank-name"
            v-model="bankName"
            class="input-field"
            required
          >
            <option v-for="bank in bankOptions" :key="bank" :value="bank">
              {{ bank }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="input-container">
          <label for="city">Tỉnh/Thành phố</label>
          <input type="text" id="city" v-model="city" class="input-field" />
        </div>
        <div class="input-container">
          <label for="branch">Chi nhánh</label>
          <input type="text" id="branch" v-model="branch" class="input-field" />
        </div>
      </div>
      <div class="form-row">
        <div class="input-container">
          <label for="branch-address">Địa chỉ chi nhánh</label>
          <input
            type="text"
            id="branch-address"
            v-model="branchAddress"
            class="input-field"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-container">
          <label for="account-holder">Chủ tài khoản</label>
          <input
            type="text"
            id="account-holder"
            v-model="accountHolder"
            class="input-field"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-container">
          <label for="description">Diễn giải</label>
          <input
            type="text"
            id="description"
            v-model="description"
            class="input-field"
          />
        </div>
      </div>
      <div class="form-actions">
        <router-link to="/payment"
          ><button type="button" class="btn cancel-btn" @click="cancelForm">
            Hủy
          </button>
        </router-link>
        <button type="submit" class="btn submit-btn">Cất và Thêm</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const accountNumber = ref("");
const bankName = ref("");
const city = ref("");
const branch = ref("");
const branchAddress = ref("");
const accountHolder = ref("");
const description = ref("");

const bankOptions = [
  "Ngân hàng TMCP An Bình",
  "Ngân hàng TMCP Công Thương Việt Nam",
  "Ngân hàng TMCP Ngoại Thương Việt Nam",
  // Add more bank options here
];

const submitForm = () => {
  // Handle form submission logic here
  alert("Form submitted");
};

const cancelForm = () => {
  // Handle form cancel logic here
  alert("Form canceled");
};
</script>

<style scoped>
.create-bank-account {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
</style>
