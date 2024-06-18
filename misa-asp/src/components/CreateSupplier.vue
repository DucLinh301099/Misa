<!-- src/components/CreateSupplier.vue -->
<template>
  <div class="create-supplier">
    <h2 class="form-title">Thông tin nhà cung cấp</h2>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="input-container">
          <label for="tax-code">Mã số thuế</label>
          <input
            type="text"
            id="tax-code"
            v-model="taxCode"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="supplier-code"
            >Mã nhà cung cấp <span class="required">*</span></label
          >
          <input
            type="text"
            id="supplier-code"
            v-model="supplierCode"
            class="input-field"
            required
          />
        </div>
        <div class="input-container">
          <label for="phone">Điện thoại</label>
          <input type="text" id="phone" v-model="phone" class="input-field" />
        </div>
        <div class="input-container">
          <label for="website">Website</label>
          <input
            type="text"
            id="website"
            v-model="website"
            class="input-field"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-container">
          <label for="supplier-name"
            >Tên nhà cung cấp <span class="required">*</span></label
          >
          <input
            type="text"
            id="supplier-name"
            v-model="supplierName"
            class="input-field"
            required
          />
        </div>
        <div class="input-container">
          <label for="supplier-group">Nhóm nhà cung cấp</label>
          <div class="input-group">
            <input
              type="text"
              id="supplier-group"
              v-model="supplierGroup"
              class="input-field"
            />
            <button type="button" class="btn-add">+</button>
          </div>
        </div>
        <div class="input-container">
          <label for="buyer">Nhân viên mua hàng</label>
          <div class="input-group">
            <input type="text" id="buyer" v-model="buyer" class="input-field" />
            <button type="button" class="btn-add">+</button>
          </div>
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

      <!-- Tabs Section -->
      <div class="tabs">
        <button
          type="button"
          :class="{ active: activeTab === 'contact-info' }"
          @click="activeTab = 'contact-info'"
        >
          Thông tin liên hệ
        </button>
        <button
          type="button"
          :class="{ active: activeTab === 'payment-terms' }"
          @click="activeTab = 'payment-terms'"
        >
          Điều khoản thanh toán
        </button>
        <button
          type="button"
          :class="{ active: activeTab === 'bank-account' }"
          @click="activeTab = 'bank-account'"
        >
          Tài khoản ngân hàng
        </button>
        <button
          type="button"
          :class="{ active: activeTab === 'other-address' }"
          @click="activeTab = 'other-address'"
        >
          Địa chỉ khác
        </button>
        <button
          type="button"
          :class="{ active: activeTab === 'notes' }"
          @click="activeTab = 'notes'"
        >
          Ghi chú
        </button>
      </div>

      <div class="tab-content" v-if="activeTab === 'contact-info'">
        <div class="form-row">
          <div class="input-container">
            <label for="contact-title">Người liên hệ</label>
            <select
              id="contact-title"
              v-model="contactTitle"
              class="input-field"
            >
              <option>Xưng hô</option>
              <option>Ông</option>
              <option>Bà</option>
            </select>
          </div>
          <div class="input-container">
            <label for="contact-name">Họ và tên</label>
            <input
              type="text"
              id="contact-name"
              v-model="contactName"
              class="input-field"
            />
          </div>
          <div class="input-container">
            <label for="contact-email">Email</label>
            <input
              type="email"
              id="contact-email"
              v-model="contactEmail"
              class="input-field"
            />
          </div>
          <div class="input-container">
            <label for="contact-phone">Số điện thoại</label>
            <input
              type="text"
              id="contact-phone"
              v-model="contactPhone"
              class="input-field"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="input-container full-width">
            <label for="legal-representative">Đại diện theo PL</label>
            <input
              type="text"
              id="legal-representative"
              v-model="legalRepresentative"
              class="input-field"
            />
          </div>
        </div>
      </div>
      <!-- Add content for other tabs as needed -->

      <div class="form-actions">
        <button type="button" class="btn cancel-btn" @click="$emit('close')">
          Hủy
        </button>
        <button type="submit" class="btn submit-btn">Cất và Thêm</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const taxCode = ref("");
const supplierCode = ref("");
const phone = ref("");
const website = ref("");
const supplierName = ref("");
const supplierGroup = ref("");
const buyer = ref("");
const address = ref("");
const type = ref("Tổ chức");
const isCustomer = ref(false);
const contactTitle = ref("Xưng hô");
const contactName = ref("");
const contactEmail = ref("");
const contactPhone = ref("");
const legalRepresentative = ref("");
const activeTab = ref("contact-info");

const supplierGroups = ["Nhóm 1", "Nhóm 2", "Nhóm 3"];

const employees = ["Nhân viên 1", "Nhân viên 2", "Nhân viên 3"];

const submitForm = () => {
  // Handle form submission logic here
  alert("Form submitted");
  $emit("close"); // Emit close event to close modal after submission
};

const cancelForm = () => {
  // Handle form cancel logic here
  alert("Form canceled");
};
</script>

<style scoped>
.create-supplier {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;

  max-width: 900px;
  margin: auto;
}
.btn-add {
  border: 1px solid #28a745;
  width: 40px;
  height: 40px;

  background-color: white;
  cursor: pointer;
  font-size: 24px;
  color: green;
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
  width: 100px;
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

.required {
  color: red;
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

.info-icon {
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
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

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #555;
}

.tabs button.active {
  border-bottom: 2px solid #28a745;
  color: #28a745;
}

.tab-content {
  margin-bottom: 20px;
}

.radio-group,
.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.radio-group label,
.checkbox-group label {
  margin-right: 20px;
}
</style>
