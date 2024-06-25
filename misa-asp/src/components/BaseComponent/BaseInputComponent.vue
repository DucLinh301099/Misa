<template>
  <div class="input-wrapper">
    <input
      class="base-input"
      :type="type"
      :value="value"
      @input="updateValue"
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
    selectedOption: {
      type: Object, // Kiểu dữ liệu của option đã chọn từ multiselect
      default: null,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
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
