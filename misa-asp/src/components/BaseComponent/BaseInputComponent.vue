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
      type: Object,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: null,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("onInput", event.target.value);
    },
  },
  data() {
    return {
      internalValue: "",
    };
  },
  watch: {},
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
.label {
  margin-bottom: 8px;
  font-weight: bold;
}
.base-input {
  border: none;
  padding: 8px;
  box-sizing: border-box;
  height: 30px;
  outline: none;
}
.base-input:focus {
  outline: none; /* Ensure no outline appears on focus */
}
</style>
