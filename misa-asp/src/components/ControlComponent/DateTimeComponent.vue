<template>
  <div class="datetime-component-wrapper">
    <div class="form-group">
      <label for="ngay-hach-toan">Ngày hạch toán</label>
      <div class="input-with-button">
        <BaseInput v-model="ngayHachToan" type="date" />
      </div>
    </div>
    <div class="form-group">
      <label for="ngay-chung-tu">Ngày chứng từ</label>
      <div class="input-with-button">
        <BaseInput v-model="ngayChungTu" type="date" />
      </div>
    </div>
    <div class="form-group">
      <label for="so-chung-tu">Số chứng từ</label>
      <div class="input-with-button">
        <BaseInput v-model="soChungTu" />
      </div>
    </div>
    <div class="form-group" v-if="voucherType === '3.Tạm ứng cho nhân viên'">
      <label for="han-quyet-toan">Hạn quyết toán</label>
      <div class="input-with-button">
        <BaseInput
          v-model="hanQuyetToan"
          type="date"
          placeholder="DD/MM/YYYY"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "../BaseComponent/BaseInputComponent.vue";

export default {
  name: "DateTimeComponent",
  components: {
    BaseInput,
  },
  props: {
    voucherType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ngayHachToan: "2024-06-18",
      ngayChungTu: "2024-06-18",
      soChungTu: "UNC00001",
      hanQuyetToan: "",
    };
  },
};
</script>

<style scoped>
.datetime-component-wrapper {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  border: 1px solid #999;
  border-top: none;
  border-bottom: none;
  border-right: none;
  padding-left: 25px;
}
.input-with-button {
  border: 1px solid #999;
  border-radius: 2px;
  overflow: hidden;
  flex-grow: 2;
  margin-right: auto;
  height: 35px;
  width: 70%;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px; /* Reduce the bottom margin to move the input fields closer to the labels */
}

label {
  margin-bottom: 2px; /* Reduce the bottom margin of the label */
  font-weight: bold;
}

.base-input {
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 8px;
  box-sizing: border-box;
}

.base-input input[type="date"] {
  width: calc(100% - 30px); /* Adjust to leave space for calendar icon */
  border: none;
  outline: none;
  padding: 0 8px;
  box-sizing: border-box;
}

.base-input input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 8px;
  box-sizing: border-box;
}

.base-input input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 8px;
  top: 8px;
  height: 14px;
  width: 14px;
  cursor: pointer;
}
</style>
