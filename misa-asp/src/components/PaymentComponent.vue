<template>
  <div class="container">
    <!-- Header -->
    <div id="header-layout" class="header">
      <div class="top-header">
        <div class="left-section">
          <i class="material-icons mi-recent-log">history</i>
          <div class="title">{{ dynamicTitle }}</div>
        </div>
        <div class="center-section">
          <Multiselect
            v-model="voucherType"
            :options="voucherOptions"
            class="combo-input"
          ></Multiselect>
          <label class="inline-label">Phương thức thanh toán</label>
          <Multiselect
            v-model="paymentMethod"
            :options="paymentMethods"
            class="combo-input"
          ></Multiselect>
        </div>
        <div class="right-section">
          <button class="icon-button">
            <i class="material-icons">settings</i>
          </button>
          <button class="icon-button">
            <i class="material-icons">help_outline</i>
          </button>
          <button class="icon-button">
            <i class="material-icons">close</i>
          </button>
        </div>
      </div>
    </div>

    <!-- Body Container -->
    <div class="body-container">
      <!-- Left Form -->
      <div id="payment-layout" class="payment">
        <div class="form-body">
          <form>
            <!-- Row 1 -->
            <div class="form-row">
              <div class="input-container">
                <label for="account">Tài khoản chi</label>
                <div class="input-group">
                  <input
                    type="text"
                    id="account"
                    v-model="account"
                    class="input-field"
                  />
                  <router-link to="/create-bank-account"
                    ><button type="button" class="btn-add">
                      +
                    </button></router-link
                  >
                </div>
              </div>
              <div class="input-container">
                <label for="account-address">Địa chỉ</label>
                <input
                  type="text"
                  id="account-address"
                  v-model="accountAddress"
                  class="input-field"
                />
              </div>
            </div>
            <!-- Row 2 -->
            <div class="form-row">
              <div class="input-container">
                <label for="beneficiary">Đối tượng</label>
                <div class="input-group">
                  <input
                    type="text"
                    id="beneficiary"
                    v-model="beneficiary"
                    class="input-field"
                  />
                  <router-link to="/create-supplier"
                    ><button type="button" class="btn-add">
                      +
                    </button></router-link
                  >
                </div>
              </div>
              <div class="input-container">
                <label for="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  v-model="address"
                  class="input-field"
                />
              </div>
            </div>
            <!-- Row 3 -->
            <div class="form-row">
              <div class="input-container">
                <label for="account-receive">Tài khoản nhận</label>
                <div class="input-group">
                  <Multiselect
                    v-model="accountReceive"
                    :options="accountReceiveOptions"
                    class="combo-input"
                  ></Multiselect>
                </div>
              </div>
            </div>
            <!-- Row 4 -->
            <div class="form-row">
              <div class="input-container">
                <label for="content">Nội dung thanh toán</label>
                <input
                  type="text"
                  id="content"
                  v-model="content"
                  class="input-field"
                />
              </div>
            </div>
            <!-- Row 5 -->
            <div class="form-row">
              <div class="input-container">
                <label for="employee">Nhân viên</label>
                <div class="input-group">
                  <input
                    type="text"
                    id="employee"
                    v-model="employee"
                    class="input-field"
                  />
                  <router-link to="/create-employee"
                    ><button type="button" class="btn-add">
                      +
                    </button></router-link
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Form -->
      <div id="form-layout" class="form-layout">
        <div class="form-body-right">
          <div class="left-column">
            <div class="form-row1">
              <label for="posting-date">Ngày hạch toán</label>
              <input
                type="date"
                id="posting-date"
                v-model="postingDate"
                class="input-field"
              />
            </div>
            <div class="form-row1">
              <label for="document-date">Ngày chứng từ</label>
              <input
                type="date"
                id="document-date"
                v-model="documentDate"
                class="input-field"
              />
            </div>
            <div class="form-row1">
              <label for="document-number">Số chứng từ</label>
              <input
                type="text"
                id="document-number"
                v-model="documentNumber"
                class="input-field"
              />
            </div>
          </div>
        </div>
        <div class="right-column">
          <div class="total-amount-label">Tổng tiền</div>
          <div class="total-amount">{{ totalAmount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

const voucherType = ref("1.Trả tiền nhà cung cấp");
const paymentMethod = ref("Ủy nhiệm chi");

const voucherOptions = [
  "1.Trả tiền nhà cung cấp",
  "2.Trả các khoản vay",
  "3.Tạm ứng cho nhân viên",
  "4. Chi mua ngoài có hóa đơn",
  "5. Chi khác",
];

const paymentMethods = ["Ủy nhiệm chi", "Séc chuyển khoản", "Séc tiền mặt"];

const dynamicTitle = computed(() => `${paymentMethod.value} UNC00001`);

// Form data
const account = ref("");
const accountAddress = ref("");
const beneficiary = ref("");
const address = ref("");
const accountReceive = ref("");
const content = ref("");
const employee = ref("");
const postingDate = ref("2024-06-17");
const documentDate = ref("2024-06-17");
const documentNumber = ref("UNC00001");
const totalAmount = ref(0);

const accountOptions = ["Option 1", "Option 2"];
const accountType = ref(accountOptions[0]);
const accountReceiveOptions = ["Ngân hàng TMCP An Bình"];

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
@import "@vueform/multiselect/themes/default.css";
.container {
  background-color: #f4f5f8;
  font-family: AvertaStdCY, Helvetica, Arial, sans-serif;
}

#payment-layout,
#form-layout {
  width: 45%;
  margin: 20px;
}

#header-layout {
  background-color: #f7f7f7;
  border-bottom: 1px solid #e5e5e5;
  padding: 5px 20px;
  width: 100%;
}

.top-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.left-section {
  display: flex;
  align-items: center;
}

.mi-recent-log {
  font-size: 20px;
  margin-right: 10px;
}

.title {
  font-size: 26px;
  font-weight: bold;
}

.center-section {
  display: flex;
  align-items: center;
}

.combo-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 220px;
  font-size: 14px;
  height: 30px;
  padding: 0 8px;
  margin-left: 15px;
  margin-right: 15px;
}

.inline-label {
  margin-left: 10px;
  white-space: nowrap;
}

.right-section {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 30px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

.icon-button i {
  font-size: 24px;
}

.body-container {
  display: flex;
  justify-content: space-around;
  font-weight: bold;
}

.form-body {
  padding: 20px;

  border-radius: 4px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
  width: 100%;
  background-color: #f4f5f8;
}
.form-body-right {
  padding: 20px;
  background-color: #f4f5f8;

  border: 0.5px solid #666;
  border-right: none;
  border-bottom: none;
  border-top: none;
  width: 50%;
}
form {
  display: grid;
  grid-template-columns: 1fr;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.form-row1 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-direction: column;
}
.input-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;
}

.input-group {
  display: flex;
  align-items: center;
  position: relative;
}

.input-field {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

.btn-add {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: -30px;
  margin-top: 5px;
}

.btn-add:hover {
  background-color: #218838;
}

.combo-select {
  margin-left: 5px;
}

.left-column {
  display: flex;
  flex-direction: column;

  margin-right: 20px;
}

.right-column {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-width: 120px;
}

.total-amount-label {
  font-size: 16px;
  font-weight: bold;
}

.total-amount {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
