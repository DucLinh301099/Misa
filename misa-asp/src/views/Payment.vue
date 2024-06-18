<template>
  <section class="payment">
    <HeaderPayment />
    <div class="input-information">
      <div class="input-information-right">
        <ExpenseAccountInput />
        <SupplierInput />
        <AccountReceive />
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
        <CreateEmployeeInput />
      </div>
      <div class="input-information-center">
        <DateTimeComponent />
      </div>
      <div class="input-information-left">
        <SummaryComponent />
      </div>
    </div>
    <AccountingComponent />
    <AttachFile />
    <FooterPayment />
  </section>
</template>

<script>
import HeaderPayment from "../components/HeaderPayment.vue";
import ExpenseAccountInput from "../components/ControlComponent/ExpenseAccountInput.vue";
import SupplierInput from "../components/ControlComponent/SupplierInput.vue";
import AccountReceive from "../components/ControlComponent/AccountReceive.vue";
import BaseInputComponent from "../components/BaseComponent/BaseInputComponent.vue";
import CreateEmployeeInput from "../components/ControlComponent/CreateEmployeeInput.vue";
import DateTimeComponent from "../components/ControlComponent/DateTimeComponent.vue";
import FooterPayment from "../components/ControlComponent/FooterPayment.vue";
import SummaryComponent from "../components/ControlComponent/SummaryComponent.vue";
import AccountingComponent from "../components/ControlComponent/AccountingComponent.vue";
import AttachFile from "../components/ControlComponent/AttachFile.vue";

export default {
  name: "Payment",
  components: {
    HeaderPayment,
    ExpenseAccountInput,
    SupplierInput,
    AccountReceive,
    BaseInputComponent,
    CreateEmployeeInput,
    DateTimeComponent,
    FooterPayment,
    SummaryComponent,
    AccountingComponent,
    AttachFile,
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
  border-radius: 4px;
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

/* Global styles for the Home view */
</style>
