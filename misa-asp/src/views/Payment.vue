<template>
  <section class="payment">
    <HeaderPayment
      :voucherType="voucherType"
      :paymentMethod="paymentMethod"
      @update:voucherType="voucherType = $event"
      @update:paymentMethod="paymentMethod = $event"
    />
    <div class="input-information">
      <div class="input-information-right">
        <ComboboxInput
          label="Tài khoản chi"
          :options="extendResources.options"
          :columnConfig="extendResources.columnConfig"
          :triggerModal="openCreateBankAccountModal"
          isRequired="true"
          :show-second-input_employee="false"
        />
        <ComboboxInput
          label="Đối Tượng"
          :options="supplier.options"
          :columnConfig="supplier.columnConfig"
          :triggerModal="openCreateSupplierModal"
          :show-second-input_employee="false"
        />

        <component
          :is="showInformationInput ? 'InformationInput' : 'AccountReceive'"
        />
        <div class="bill-content-input-wrapper">
          <label for="bill-content-input">Nội dung thanh toán</label>
          <div class="input-container">
            <div class="input-with-button-1">
              <BaseInputComponent
                v-model:value="inputValue"
                :validator="inputValidator"
                class="base-input-1"
              />
            </div>
          </div>
        </div>
        <ComboboxInput
          v-if="!hideCreateEmployeeInput"
          label="Nhân viên"
          :options="employeeResources.options"
          :columnConfig="employeeResources.columnConfig"
          :triggerModal="openCreateEmployeeModal"
          :showComponent="!hideCreateEmployeeInput"
          :showSecondInput="false"
        />
      </div>
      <div class="input-information-center">
        <DateTimeComponent :voucherType="voucherType" />
      </div>
      <div class="input-information-left">
        <SummaryComponent />
      </div>
    </div>
    <AccountingComponent />
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

    <!-- Create Supplier Modal -->
    <Modal
      :visible="isCreateSupplierModalVisible"
      @close="closeCreateSupplierModal"
    >
      <CreateSupplier
        @submit="handleCreateSupplierSubmit"
        @close="closeCreateSupplierModal"
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
import ComboboxInput from "../components/ControlPaymentComponent/ComboboxInput.vue";
import AccountReceive from "../components/PaymentPage/AccountReceive.vue";
import BaseInputComponent from "../components/BaseComponent/BaseInputComponent.vue";
import DateTimeComponent from "../components/ControlPaymentComponent/DateTimeComponent.vue";
import FooterPayment from "../components/PaymentPage/FooterPayment.vue";
import SummaryComponent from "../components/ControlPaymentComponent/SummaryComponent.vue";
import AccountingComponent from "../components/ControlPaymentComponent/AccountingComponent.vue";
import AttachFile from "../components/PaymentPage/AttachFile.vue";
import InformationInput from "../components/PaymentPage/InformationInput.vue";
import CreateBankAccount from "../components/PaymentPage/CreateBankAccount.vue";
import CreateSupplier from "../components/PaymentPage/CreateSupplier.vue";
import CreateEmployee from "../components/PaymentPage/CreateEmployee.vue";
import Modal from "../components/BaseComponent/Modal.vue";

export default {
  name: "Payment",
  components: {
    HeaderPayment,
    ComboboxInput,
    AccountReceive,
    BaseInputComponent,
    DateTimeComponent,
    FooterPayment,
    SummaryComponent,
    AccountingComponent,
    AttachFile,
    InformationInput,
    CreateBankAccount,
    CreateSupplier,
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
            branch: "",
          },
        ],
        columnConfig: [
          { columnName: "Số tài khoản", fieldName: "accountNumber" },
          { columnName: "Tên ngân hàng", fieldName: "bankName" },
          { columnName: "Chi nhánh", fieldName: "branch" },
        ],
      },
      supplier: {
        options: [
          {
            id: "KH00001",
            name: "LÊ THỊ NHÀN 72M 0353",
            taxCode: "350010005...",
            address: "Long điền, Huyện Long Điền, Tỉnh Bà Rịa - V...",
            phone: "0982635679",
          },
          {
            id: "KH00002",
            name: "Nguyễn Thị Dung",
            taxCode: "",
            address: "số 85 ngõ 120 vĩnh tuy",
            phone: "0982635679",
          },
          { id: "NV00001", name: "A", taxCode: "", address: "", phone: "" },
          { id: "NV00002", name: "Linh", taxCode: "", address: "", phone: "" },
        ],
        columnConfig: [
          { columnName: "Đối tượng", fieldName: "id" },
          { columnName: "Tên đối tượng", fieldName: "name" },
          { columnName: "Mã số thuế", fieldName: "taxCode" },
          { columnName: "Địa chỉ", fieldName: "address" },
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
          { columnName: "Mã nhân viên", fieldName: "code" },
          { columnName: "Tên nhân viên", fieldName: "name" },
          { columnName: "Đơn vị", fieldName: "unit" },
          { columnName: "ĐT di động", fieldName: "phone" },
        ],
      },
      isCreateBankAccountModalVisible: false,
      isCreateSupplierModalVisible: false,
      isCreateEmployeeModalVisible: false,
    };
  },
  setup() {
    const voucherType = ref("1.Trả tiền nhà cung cấp");
    const paymentMethod = ref("Ủy nhiệm chi");
    const inputValue = ref(""); // Thêm ref cho inputValue
    const showInformationInput = computed(
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
    const isCreateSupplierModalVisible = ref(false);
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

    const openCreateSupplierModal = () => {
      isCreateSupplierModalVisible.value = true;
    };

    const closeCreateSupplierModal = () => {
      isCreateSupplierModalVisible.value = false;
    };

    const handleCreateSupplierSubmit = (formData) => {
      console.log("Supplier data received:", formData);
      closeCreateSupplierModal();
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
      showInformationInput,
      hideCreateEmployeeInput,
      isCreateBankAccountModalVisible,
      isCreateSupplierModalVisible,
      isCreateEmployeeModalVisible,
      openCreateBankAccountModal,
      closeCreateBankAccountModal,
      handleCreateBankAccountSubmit,
      openCreateSupplierModal,
      closeCreateSupplierModal,
      handleCreateSupplierSubmit,
      openCreateEmployeeModal,
      closeCreateEmployeeModal,
      handleCreateEmployeeSubmit,
    };
  },
};
</script>

<style scoped>
.input-information {
  display: flex;
  font-size: 15px;
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
