<!-- src/components/BaseInput.vue -->
<template>
  <div class="input-wrapper">
    <label v-if="label">{{ label }}</label>
    <input
      class="base-input"
      :type="type"
      :value="value"
      :placeholder="placeholder"
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
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
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
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.base-input {
  width: 100%;
  height: 30px; /* Adjust if needed */
  border: none;
  padding: 0 8px;
  box-sizing: border-box;
  margin-top: 4px; /* Space between label and input */
}
</style>
