<!-- src/components/CreateEmployee.vue -->
<template>
  <div class="create-employee">
    <h2 class="form-title">Thông tin nhân viên</h2>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="input-container">
          <label for="employee-code">Mã <span class="required">*</span></label>
          <input
            type="text"
            id="employee-code"
            v-model="employeeCode"
            class="input-field"
            required
          />
        </div>
        <div class="input-container">
          <label for="employee-name">Tên <span class="required">*</span></label>
          <input
            type="text"
            id="employee-name"
            v-model="employeeName"
            class="input-field"
            required
          />
        </div>
        <div class="input-container">
          <label for="birthdate">Ngày sinh</label>
          <input
            type="date"
            id="birthdate"
            v-model="birthdate"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="gender">Giới tính</label>
          <div class="radio-group">
            <label
              ><input type="radio" v-model="gender" value="Nam" /> Nam</label
            >
            <label><input type="radio" v-model="gender" value="Nữ" /> Nữ</label>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="input-container">
          <label for="department">Đơn vị <span class="required">*</span></label>
          <input
            type="text"
            id="department"
            v-model="department"
            class="input-field"
            required
          />
        </div>
        <div class="input-container">
          <label for="identity">Số CMND</label>
          <input
            type="text"
            id="identity"
            v-model="identity"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="issue-date">Ngày cấp</label>
          <input
            type="date"
            id="issue-date"
            v-model="issueDate"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="issue-place">Nơi cấp</label>
          <input
            type="text"
            id="issue-place"
            v-model="issuePlace"
            class="input-field"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="input-container">
          <label for="position">Chức danh</label>
          <input
            type="text"
            id="position"
            v-model="position"
            class="input-field"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="checkbox-group">
          <label
            ><input type="checkbox" v-model="isCustomer" /> Là khách hàng</label
          >
          <label
            ><input type="checkbox" v-model="isSupplier" /> Là nhà cung
            cấp</label
          >
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="tabs">
        <button
          type="button"
          :class="{ active: activeTab === 'salary-info' }"
          @click="activeTab = 'salary-info'"
        >
          Thông tin tiền lương
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
          :class="{ active: activeTab === 'contact-info' }"
          @click="activeTab = 'contact-info'"
        >
          Thông tin liên hệ
        </button>
      </div>

      <div class="tab-content" v-if="activeTab === 'salary-info'">
        <div class="form-row">
          <div class="input-container">
            <label for="salary">Lương thỏa thuận</label>
            <input
              type="number"
              id="salary"
              v-model="salary"
              class="input-field"
            />
          </div>
          <div class="input-container">
            <label for="salary-coefficient">Hệ số lương</label>
            <input
              type="number"
              id="salary-coefficient"
              v-model="salaryCoefficient"
              class="input-field"
            />
          </div>
          <div class="input-container">
            <label for="insurance-salary">Lương đóng bảo hiểm</label>
            <input
              type="number"
              id="insurance-salary"
              v-model="insuranceSalary"
              class="input-field"
            />
          </div>
        </div>
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
            <label for="contract-type"
              >Loại hợp đồng <span class="required">*</span></label
            >
            <select
              id="contract-type"
              v-model="contractType"
              class="input-field"
              required
            >
              <option>Cư trú và có HĐLĐ từ 3 tháng trở lên</option>
              <option>Khác</option>
            </select>
          </div>
          <div class="input-container">
            <label for="dependents">Số người phụ thuộc</label>
            <input
              type="number"
              id="dependents"
              v-model="dependents"
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

const employeeCode = ref("");
const employeeName = ref("");
const birthdate = ref("");
const gender = ref("Nam");
const department = ref("");
const identity = ref("");
const issueDate = ref("");
const issuePlace = ref("");
const position = ref("");
const isCustomer = ref(false);
const isSupplier = ref(false);
const salary = ref(0);
const salaryCoefficient = ref(0);
const insuranceSalary = ref(0);
const taxCode = ref("");
const contractType = ref("Cư trú và có HĐLĐ từ 3 tháng trở lên");
const dependents = ref(0);
const activeTab = ref("salary-info");

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
.create-employee {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;

  max-width: 900px;
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

.tabs {
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
}

.tabs button.active {
  border-bottom: 2px solid #28a745;
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
