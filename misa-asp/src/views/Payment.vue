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
              :options="extendResources.options"
              :columnConfig="extendResources.columnConfig"
              :triggerModal="openCreateBankAccountModal"
              :showButto="true"
              :selectedOption="selectedBankAccount"
              @update:selectedRow="updateSelectedRow('bankAccount', $event)"
            />

            <BaseInput
              v-model="bankNameInput"
              class="base-input second-input"
              :type="type"
              :value="bankNameInput"
              @input="updateSecondInputValue"
              @focus="handleFocus"
              @blur="handleBlur"
            />
          </div>
          <div class="account-input-wrapper">
            <ComboboxInput
              label="Đối Tượng"
              :options="customer.options"
              :columnConfig="customer.columnConfig"
              :triggerModal="openCreateCustomerModal"
              :showButton="true"
              :selectedOption="selectedCustomer"
              @update:selectedRow="updateSelectedRow('customer', $event)"
            />
            <BaseInput
              v-model="addressValue"
              class="base-input second-input"
              :type="type"
              :value="addressValue"
              @input="updateSecondInputValue"
              @focus="handleFocus"
              @blur="handleBlur"
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
              @focus="handleFocus"
              @blur="handleBlur"
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
              :options="employeeResources.options"
              :columnConfig="employeeResources.columnConfig"
              :triggerModal="openCreateEmployeeModal"
              :showComponent="!hideCreateEmployeeInput"
              :showButton="true"
              :selectedOption="selectedEmployee"
              @update:selectedRow="updateSelectedRow('employee', $event)"
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
    <div class="  ">
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
import { ref, computed } from "vue";
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
      extendResources: {
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
      customer: {
        options: [
          {
            id: "KH00001",
            name: "LÊ THỊ NHÀN ",
            taxCode: "350010005",
            address: "Long điền, Long Điền, Bà Rịa",
            phone: "0982635679",
          },
          {
            id: "KH00002",
            name: "Nguyễn Thị Dung",
            taxCode: "350010005",
            address: "số 85 ngõ 120 vĩnh tuy",
            phone: "0982635679",
          },
          {
            id: "NV00001",
            name: "Minh Anh",
            taxCode: "350010005",
            address: "Hải Dương",
            phone: "0975684324",
          },
          {
            id: "NV00002",
            name: "Đức Linh",
            taxCode: "350010005",
            address: "Hà Nội",
            phone: "0988654124",
          },
        ],
        columnConfig: [
          { columnName: "Đối tượng", fieldName: "id" },
          {
            columnName: "Tên đối tượng",
            fieldName: "name",
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
          { columnName: "Điện thoại", fieldName: "phone" },
        ],
      },
      employeeResources: {
        options: [
          { code: "NV00001", name: "A", unit: "PKT", phone: "123456789" },
          {
            code: "NV00002",
            name: "Linh",
            unit: "CÔNG TY TNHH ĐỒNG PHÚ",
            phone: "987654321",
          },
        ],
        columnConfig: [
          {
            columnName: "Mã nhân viên",
            fieldName: "code",
            isDisplay: true,
            isValue: true,
          },
          { columnName: "Tên nhân viên", fieldName: "name" },
          { columnName: "Đơn vị", fieldName: "unit" },
          { columnName: "ĐT di động", fieldName: "phone" },
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
      selectedBankAccount: null,
      selectedCustomer: null,
      selectedEmployee: null,
      selectedAccountReceive: null,
      inputValue: "",
      secondInputValue: "",
      isCreateBankAccountModalVisible: false,
      isCreateCustomerModalVisible: false,
      isCreateEmployeeModalVisible: false,
    };
  },
  methods: {
    updateSelectedRow(type, item) {
      switch (type) {
        case "bankAccount":
          this.selectedBankAccount = item;
          this.inputValue = item.accountNumber;
          this.bankNameInput = item.bankName;
          break;
        case "customer":
          this.selectedSupplier = item;
          this.inputValue = item.id;
          this.paymentContent = `Chi tiền cho ${item.name}`;
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
    // ... existing methods ...
  },
  setup() {
    const voucherType = ref("1.Trả tiền nhà cung cấp");
    const paymentMethod = ref("Ủy nhiệm chi");
    const inputValue = ref(""); // Thêm ref cho inputValue
    // const showInformationInput = computed(
    //   () => paymentMethod.value === "Séc tiền mặt"
    // );
    const hideInformationInput = computed(
      () =>
        paymentMethod.value === "Ủy nhiệm chi" ||
        paymentMethod.value === "Séc chuyển khoản"
    );
    const hideAccountReceive = computed(
      () => paymentMethod.value === "Séc tiền mặt"
    );
    const hideCreateEmployeeInput = computed(
      () =>
        voucherType.value === "2.Trả các khoản vay" ||
        voucherType.value === "3.Tạm ứng cho nhân viên"
    );
    const inputValidator = (value) => {
      if (!value) {
        return "This field is required";
      }
      if (value.length < 3) {
        return "Must be at least 3 characters";
      }
      return "";
    };

    const isCreateBankAccountModalVisible = ref(false);
    const isCreateCustomerModalVisible = ref(false);
    const isCreateEmployeeModalVisible = ref(false);

    const openCreateBankAccountModal = () => {
      isCreateBankAccountModalVisible.value = true;
    };

    const closeCreateBankAccountModal = () => {
      isCreateBankAccountModalVisible.value = false;
    };

    const handleCreateBankAccountSubmit = (formData) => {
      console.log("Bank account data received:", formData);
      closeCreateBankAccountModal();
    };

    const openCreateCustomerModal = () => {
      isCreateCustomerModalVisible.value = true;
    };

    const closeCreateCustomerModal = () => {
      isCreateCustomerModalVisible.value = false;
    };

    const handleCreateCustomerSubmit = (formData) => {
      console.log("Customer data received:", formData);
      closeCreateCustomerModal();
    };

    const openCreateEmployeeModal = () => {
      isCreateEmployeeModalVisible.value = true;
    };

    const closeCreateEmployeeModal = () => {
      isCreateEmployeeModalVisible.value = false;
    };

    const handleCreateEmployeeSubmit = (formData) => {
      console.log("Employee data received:", formData);
      closeCreateEmployeeModal();
    };

    return {
      voucherType,
      paymentMethod,
      inputValue,
      inputValidator,
      hideAccountReceive,
      hideInformationInput,
      hideCreateEmployeeInput,
      isCreateBankAccountModalVisible,
      isCreateCustomerModalVisible,
      isCreateEmployeeModalVisible,
      openCreateBankAccountModal,
      closeCreateBankAccountModal,
      handleCreateBankAccountSubmit,
      openCreateCustomerModal,
      closeCreateCustomerModal,
      handleCreateCustomerSubmit,
      openCreateEmployeeModal,
      closeCreateEmployeeModal,
      handleCreateEmployeeSubmit,
    };
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
