<template>
  <section class="payment">
    <HeaderPayment
      :voucherType="voucherType"
      :paymentMethod="paymentMethod"
      @update:voucherType="voucherType = $event"
      @update:paymentMethod="paymentMethod = $event"
      class="header-payment"
    />
    <div class="input-information">
      <div class="input-information-right">
        <div class="account-input-container">
          <div class="account-input-wrapper">
            <ComboboxInput
              label="Tài khoản chi"
              :selectedOption="selectedBankExpense"
              @update:selectedRow="updateSelectedRow('bankExpense', $event)"
              :config="paymentConfigCombo.comboxConfig.bankExpense"
              :ComponentAdd="createBankAccountComponent"
            />
            <BaseInput
              v-model="bankNameInput"
              class="base-input second-input"
              :type="type"
              :value="bankNameInput"
            />
          </div>
          <div class="account-input-wrapper">
            <!-- <div class="customer-right"> -->
            <ComboboxInput
              label="Đối Tượng"
              :selectedOption="selectedCustomer"
              @update:selectedRow="updateSelectedRow('customer', $event)"
              :config="paymentConfigCombo.comboxConfig.customer"
              :ComponentAdd="createCustomerComponent"
            />
            <!-- </div> -->

            <BaseInput
              v-model="addressValue"
              class="base-input second-input"
              :type="type"
              :value="addressValue"
            />
          </div>
          <div class="account-input-wrapper">
            <ComboboxInput
              v-if="!hideAccountReceive"
              label="Tài Khoản Nhận"
              :showButton="false"
              :selectedOption="selectedBankReceive"
              @update:selectedRow="updateSelectedRow('bankReceive', $event)"
              :config="paymentConfigCombo.comboxConfig.bankReceive"
            />
            <BaseInput
              v-if="!hideAccountReceive"
              v-model="accountReceiveValue"
              class="base-input second-input"
              :type="type"
              :value="accountReceiveValue"
            />
          </div>
          <InformationInput v-if="!hideInformationInput" />

          <div class="bill-content-input-wrapper">
            <label for="bill-content-input">Nội dung thanh toán</label>
            <div class="input-container">
              <div class="input-with-button-1">
                <BaseInput
                  v-model="inputValueCustomer"
                  :value="defaultBillContent"
                  :validator="inputValidator"
                  class="base-input-1"
                  @input="updateBillContent"
                />
              </div>
            </div>
          </div>
          <div class="account-input-wrapper">
            <ComboboxInput
              v-if="!hideCreateEmployeeInput"
              label="Nhân viên"
              :selectedOption="selectedEmployee"
              @update:selectedRow="updateSelectedRow('employee', $event)"
              :config="paymentConfigCombo.comboxConfig.employee"
              :ComponentAdd="createEmployeeComponent"
            />
          </div>
        </div>

        <div class="document">
          <div class="document-content">
            <label for="document-content">Tham chiếu chứng từ</label>
          </div>
          <div class="document-link">
            <a href="#href"> ... </a>
          </div>
        </div>
      </div>
      <div class="input-information-center">
        <DateTimeComponent :voucherType="voucherType" />
      </div>
      <div class="input-information-left">
        <SummaryComponent :totalAmount="totalAmount" />
      </div>
    </div>
    <div class=" ">
      <AccountingGrid
        :config="paymentConfigCombo.gridConfig"
        @changeValueInput="changeValueInput"
      />
      <div>
        <AttachFile />
      </div>
    </div>
    <div>
      <div>
        <FooterPayment class="footer-payment-a" />
      </div>
    </div>
  </section>
</template>

<script>
import HeaderPayment from "../components/PaymentPage/HeaderPayment.vue";
import ComboboxInput from "../components/ControlComponent/ComboboxInput.vue";
import BaseInput from "../components/BaseComponent/BaseInputComponent.vue";
import DateTimeComponent from "../components/ControlComponent/DateTimeComponent.vue";
import FooterPayment from "../components/PaymentPage/FooterPayment.vue";
import SummaryComponent from "../components/ControlComponent/SummaryComponent.vue";
import AccountingGrid from "../components/ControlComponent/AccountingGrid.vue";
import AttachFile from "../components/PaymentPage/AttachFile.vue";

import CreateBankAccount from "../components/PaymentPage/CreateBankAccount.vue";
import CreateCustomer from "../components/PaymentPage/CreateCustomer.vue";
import CreateEmployee from "../components/PaymentPage/CreateEmployee.vue";

import InformationInput from "../components/PaymentPage/InformationInput.vue";
import paymentConfig from "../config/PaymentConfig";

export default {
  name: "Payment",
  components: {
    HeaderPayment,
    ComboboxInput,
    BaseInput,
    DateTimeComponent,
    FooterPayment,
    SummaryComponent,
    AccountingGrid,
    AttachFile,
    InformationInput,
    CreateBankAccount,
    CreateCustomer,
    CreateEmployee,
  },
  data() {
    return {
      voucherType: "1.Trả tiền nhà cung cấp",
      paymentMethod: "Ủy nhiệm chi",
      errorMessage: "",
      selectedCustomer: null,
      selectedBankExpense: null,
      selectedEmployee: null,
      selectedBankReceive: null,
      inputValue: "",
      inputValueCustomer: "",
      addressValue: "",
      totalAmount: 0,
      bankNameInput: "",
      accountReceiveValue: "",
      paymentConfigCombo: paymentConfig,
      createCustomerComponent: CreateCustomer,
      createBankAccountComponent: CreateBankAccount,
      createEmployeeComponent: CreateEmployee,
    };
  },
  computed: {
    hideInformationInput() {
      return (
        this.paymentMethod === "Ủy nhiệm chi" ||
        this.paymentMethod === "Séc chuyển khoản"
      );
    },
    hideAccountReceive() {
      return this.paymentMethod === "Séc tiền mặt";
    },
    hideCreateEmployeeInput() {
      return (
        this.voucherType === "2.Trả các khoản vay" ||
        this.voucherType === "3.Tạm ứng cho nhân viên"
      );
    },
    defaultBillContent() {
      return `Chi tiền cho ${this.inputValueCustomer}`;
    },
  },
  methods: {
    changeValueInput(record, column) {
      switch (column.fieldName) {
        case "amount":
          this.updateTotalAmount(record);
          break;
      }
    },
    updateTotalAmount(record) {
      this.totalAmount = record.amount;
    },

    updateSelectedRow(type, item) {
      switch (type) {
        case "bankExpense":
          this.selectedBankExpense = item;
          this.bankNameInput = item.bankName;
          break;
        case "customer":
          this.selectedCustomer = item;
          this.inputValueCustomer = item.objectName;
          this.addressValue = item.address;
          break;
        case "bankReceive":
          this.selectedBankReceive = item;
          this.accountReceiveValue = item.bankName;
          break;
        case "employee":
          this.selectedEmployee = item;
          break;
      }
    },
    updateBillContent(newValue) {
      this.inputValueCustomer = newValue.replace("Chi tiền cho ", "");
    },
  },
};
</script>

<style scoped>
.information-input-wrapper {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 16px;
}
.information-left {
  display: flex;
}
.information-right {
  width: 45%;
}
.customer-right {
  width: 45%;
}
.input-field-cmnd,
.input-field {
  display: flex;
  flex-direction: column;
}
.input-field-date {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}
.input-field-address {
  display: flex;
  flex-direction: column;
}
.input-container {
  display: flex;
  align-items: center;
}
.input-container-infor {
  display: flex;
  outline: none;
  align-items: center;
  border: 1px solid #999;
  height: 34px;
}
.base-input {
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  border: none;
  height: 35px;
  width: 100%;
}
.base-input-infor {
  width: 100%;
  height: 30px; /* Bạn có thể thay đổi giá trị này nếu cần */
  border: none;
  padding: 0 8px;
  box-sizing: border-box;
  outline: none;
}
.input-information-right {
  width: 50%;
  margin-right: 25px;
  margin-left: 18px;
  margin-top: 4px;
}
.input-group {
  display: flex;
  gap: 16px;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}
.accountingGrid {
  margin-bottom: 50px;
}
.payment {
  padding-top: 60px;
}

.header-payment {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.footer-payment-a {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
.account-input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.account-input-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.base-input {
  border: 1px solid #999;
  padding: 8px;
  box-sizing: border-box;
  height: 35px;
  margin-left: 15px;
  width: 100%;
}

.second-input {
  border: 1px solid #999;
  border-radius: 2px;
  padding: 8px;
  box-sizing: border-box;
  height: 37px;
  flex-grow: 1;
  width: 50%;
  margin-top: 17px;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}
.input-information {
  display: flex;
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 15px;
}
.input-information-right {
  width: 50%;
  margin-right: 25px;
  margin-left: 18px;
  margin-top: 4px;
}
.input-information-center {
  margin-bottom: auto;
}
.input-information-left {
  width: 30%;
}
.payment {
  font-family: AvertaStdCY, Helvetica, Arial, sans-serif;
}
.bill-content-input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
label {
  margin-bottom: 8px;
  font-weight: bold;
}
.input-container {
  display: flex;
  align-items: center;
}
.document {
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
}
.document-link {
  color: inherit;
  margin-left: 10px;
  font-weight: bold;
}

.input-with-button-1 {
  display: flex;
  align-items: center;
  border: 1px solid #999;
  border-radius: 2px;
  overflow: hidden;
  flex-grow: 2;
  height: 35px;
}
.base-input-1 {
  border: none;
  padding: 8px;
  box-sizing: border-box;
  height: 40px;
  width: 300px;
}
.base-input input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 8px;
}
.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: white;
  cursor: pointer;
  font-size: 24px;
  color: green;
}
.app-container {
  padding-top: 80px;
}
.main-contain {
  font-family: AvertaStdCY, Helvetica, Arial, sans-serif;
}
</style>
