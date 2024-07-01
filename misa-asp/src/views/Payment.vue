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
              :columnConfig="bankAccount.bankAccountColumnConfig"
              :triggerModal="openCreateBankAccountModal"
              :showButton="true"
              :roleId="roleId"
              :selectedOption="selectedBankAccount"
              @update:selectedRow="updateSelectedRow('bankAccount', $event)"
              apiEndpoint="BankAccount/bankAccount"
            />

            <BaseInput
              v-model="bankNameInput"
              class="base-input second-input"
              :type="type"
              :value="bankNameInput"
              @input="updateSecondInputValue"
            />
          </div>
          <div class="account-input-wrapper">
            <ComboboxInput
              label="Đối Tượng"
              :columnConfig="customer.customerColumnConfig"
              :triggerModal="openCreateCustomerModal"
              :showButton="true"
              :selectedOption="selectedCustomer"
              @update:selectedRow="updateSelectedRow('customer', $event)"
              apiEndpoint="Customer/customer"
            />
            <BaseInput
              v-model="addressValue"
              class="base-input second-input"
              :type="type"
              :value="addressValue"
              @input="updateSecondInputValue"
            />
          </div>
          <div class="account-input-wrapper">
            <ComboboxInput
              v-if="!hideAccountReceive"
              label="Tài Khoản Nhận"
              :options="accountReceive.options"
              :columnConfig="accountReceive.columnConfig"
              :showComponent="!hideAccountReceive"
              :showButton="false"
              :selectedOption="selectedAccountReceive"
              @update:selectedRow="updateSelectedRow('accountReceive', $event)"
            />
            <BaseInput
              v-if="!hideAccountReceive"
              v-model="accountReceiveValue"
              class="base-input second-input"
              :type="type"
              :value="accountReceiveValue"
              @input="updateSecondInputValue"
            />
          </div>
          <InformationInput
            v-if="!hideInformationInput"
            :showComponent="!hideInformationInput"
          />
          <div class="bill-content-input-wrapper">
            <label for="bill-content-input">Nội dung thanh toán</label>
            <div class="input-container">
              <div class="input-with-button-1">
                <BaseInput
                  v-model:value="paymentContent"
                  :validator="inputValidator"
                  class="base-input-1"
                />
              </div>
            </div>
          </div>
          <div class="account-input-wrapper">
            <ComboboxInput
              v-if="!hideCreateEmployeeInput"
              label="Nhân viên"
              :columnConfig="employeeResources.employeeColumnConfig"
              :triggerModal="openCreateEmployeeModal"
              :showComponent="!hideCreateEmployeeInput"
              :showButton="true"
              :selectedOption="selectedEmployee"
              @update:selectedRow="updateSelectedRow('employee', $event)"
              apiEndpoint="Account/employee"
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
        <SummaryComponent />
      </div>
    </div>
    <div class=" ">
      <AccountingGrid />
    </div>

    <AttachFile />

    <FooterPayment />

    <!-- Create Bank Account Modal -->
    <Modal
      :visible="isCreateBankAccountModalVisible"
      @close="closeCreateBankAccountModal"
    >
      <CreateBankAccount
        @submit="handleCreateBankAccountSubmit"
        @close="closeCreateBankAccountModal"
      />
    </Modal>

    <!-- Create Customer Modal -->
    <Modal
      :visible="isCreateCustomerModalVisible"
      @close="closeCreateCustomerModal"
    >
      <CreateCustomer
        @submit="handleCreateCustomerSubmit"
        @close="closeCreateCustomerModal"
      />
    </Modal>

    <!-- Create Employee Modal -->
    <Modal
      :visible="isCreateEmployeeModalVisible"
      @close="closeCreateEmployeeModal"
    >
      <CreateEmployee
        @submit="handleCreateEmployeeSubmit"
        @close="closeCreateEmployeeModal"
      />
    </Modal>
  </section>
</template>

<script>
import { ref } from "vue";
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
import Modal from "../components/BaseComponent/Modal.vue";
import InformationInput from "../components/PaymentPage/InformationInput.vue";

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
    Modal,
  },
  data() {
    return {
      voucherType: ref("1.Trả tiền nhà cung cấp"),
      paymentMethod: ref("Ủy nhiệm chi"),
      errorMessage: ref(""),
      customer: {
        customerColumnConfig: [
          { columnName: "Đối tượng", fieldName: "objectId" },
          {
            columnName: "Tên đối tượng",
            fieldName: "objectName",
            isDisplay: true,
            isValue: true,
          },
          { columnName: "Mã số thuế", fieldName: "taxCode" },
          {
            columnName: "Địa chỉ",
            fieldName: "address",
            isDisplaySecond: true,
            isValue: true,
          },
          { columnName: "Điện thoại", fieldName: "phoneNumber" },
        ],
      },
      bankAccount: {
        bankAccountColumnConfig: [
          {
            columnName: "Số tài khoản",
            fieldName: "accountNumber",
            isValue: true,
            isDisplay: true,
          },
          {
            columnName: "Tên ngân hàng",
            fieldName: "bankName",
            isDisplaySecond: true,
            isValue: true,
          },
          { columnName: "Chi nhánh", fieldName: "branch" },
        ],
      },
      employeeResources: {
        employeeColumnConfig: [
          {
            columnName: "Mã nhân viên",
            fieldName: "employeeCode",
            isDisplay: true,
            isValue: true,
          },
          { columnName: "Tên nhân viên", fieldName: "employeeName" },
          { columnName: "Đơn vị", fieldName: "department" },
          { columnName: "ĐT di động", fieldName: "mobilePhone" },
        ],
      },
      accountReceive: {
        options: [
          {
            accountNumber: "100871906534",
            bankName: "Ngân hàng TMCP Ngoại thương Việt Nam",
            branch: "Hai Bà Trưng",
          },
          {
            accountNumber: "0344039457",
            bankName: "Ngân hàng TMCP An Bình",
            branch: "Thanh Xuân",
          },
        ],
        columnConfig: [
          {
            columnName: "Số tài khoản",
            fieldName: "accountNumber",
            isDisplay: true,
            isValue: true,
          },
          { columnName: "Tên ngân hàng", fieldName: "bankName" },
          {
            columnName: "Chi nhánh",
            fieldName: "branch",
            isDisplaySecond: true,
            isValue: true,
          },
        ],
      },
      selectedCustomer: ref(null),
      selectedBankAccount: ref(null),
      selectedEmployee: ref(null),
      selectedAccountReceive: ref(null),
      inputValue: ref(""),
      secondInputValue: ref(""),
      isCreateBankAccountModalVisible: ref(false),
      isCreateCustomerModalVisible: ref(false),
      isCreateEmployeeModalVisible: ref(false),
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
  },
  methods: {
    openCreateBankAccountModal() {
      this.isCreateBankAccountModalVisible = true;
    },
    closeCreateBankAccountModal() {
      this.isCreateBankAccountModalVisible = false;
    },
    handleCreateBankAccountSubmit(formData) {
      console.log("Bank account data received:", formData);
      this.closeCreateBankAccountModal();
    },
    openCreateCustomerModal() {
      this.isCreateCustomerModalVisible = true;
    },
    closeCreateCustomerModal() {
      this.isCreateCustomerModalVisible = false;
    },
    handleCreateCustomerSubmit(formData) {
      console.log("Customer data received:", formData);
      this.closeCreateCustomerModal();
    },
    openCreateEmployeeModal() {
      this.isCreateEmployeeModalVisible = true;
    },
    closeCreateEmployeeModal() {
      this.isCreateEmployeeModalVisible = false;
    },
    handleCreateEmployeeSubmit(formData) {
      console.log("Employee data received:", formData);
      this.closeCreateEmployeeModal();
    },
    updateSelectedRow(type, item) {
      switch (type) {
        case "bankAccount":
          this.selectedBankAccount = item;
          this.inputValue = item.accountNumber;
          this.bankNameInput = item.bankName;
          break;
        case "customer":
          this.selectedCustomer = item;
          this.inputValue = item.objectName;
          this.addressValue = item.address;
          break;
        case "accountReceive":
          this.selectedAccountReceive = item;
          this.inputValue = item.accountNumber;
          this.accountReceiveValue = item.bankName;
          break;
        case "employee":
          this.selectedEmployee = item;
          this.inputValue = item.code;
          break;
      }
    },
  },
};
</script>

<style scoped>
.accountingGrid {
  margin-bottom: 50px;
}
.payment {
  padding-top: 60px; /* Đảm bảo nội dung không bị chèn lên header cố định */
}

.header-payment {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff; /* Đảm bảo header có nền trắng */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Thêm đổ bóng để phân biệt với nội dung */
}

.account-input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.account-input-wrapper {
  display: flex;
  align-items: center;
}

.base-input {
  border: 1px solid #999;
  padding: 8px;
  box-sizing: border-box;
  height: 35px;
  margin-left: 15px;
  width: 100%; /* Adjust the width as needed */
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
}
.input-information-left {
  width: 30%;
}
.input-information-center {
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
  color: inherit; /* Inherit color from parent div */

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
  /* Adjust this value based on the height of your header */
}
.main-contain {
  font-family: AvertaStdCY, Helvetica, Arial, sans-serif;
}
</style>
