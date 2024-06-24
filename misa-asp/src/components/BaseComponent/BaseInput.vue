<template>
  <div class="input-wrapper">
    <input
      class="base-input"
      :type="type"
      :value="displayValue"
      @input="updateInternalValue($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    // Thêm một prop mới để đánh dấu dữ liệu đã được chọn từ selectOption
    selectedData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    // Hiển thị giá trị từ selectedData vào BaseInput
    displayValue() {
      if (this.selectedData) {
        return this.selectedData.accountNumber;
      }
      if (this.selectedData) {
        return this.selectedData.bankName;
      } else {
        return this.value;
      }
    },
  },
  methods: {
    // Sử dụng phương thức này để cập nhật giá trị nội bộ, không phát ra sự kiện input
    updateInternalValue(value) {
      this.$emit("update", value);
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.base-input {
  width: 100%;
  height: 30px; /* Bạn có thể thay đổi giá trị này nếu cần */
  border: none;
  padding: 0 8px;
  box-sizing: border-box;
}
</style>
