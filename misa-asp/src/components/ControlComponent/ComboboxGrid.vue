<template>
  <div class="combobox-grid">
    <div class="input-container">
      <div
        class="input-with-button"
        :class="{
          tooltip: isInputFocused && !inputValue,
          'invalid-input': isInputFocused && !isValidInput,
          'valid-input': isValidInput && !isInputFocused,
        }"
      >
        <BaseInput
          v-model="inputValue"
          :validator="inputValidator"
          class="base-input"
          :class="{ invalid: !isValidInput }"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
        />

        <multiselect
          v-bind:selected="selectedOption"
          :options="filteredOptions"
          :searchable="true"
          :close-on-select="true"
          placeholder=""
          class="multiselect"
          @update:selected="handleSelectOption"
          @open="showTable = true"
          @close="showTable = false"
        />
        <span class="input-status" v-if="!isValidInput">!</span>
      </div>
    </div>

    <transition name="dropdown">
      <div v-show="showTable" class="dropdown-table-wrapper">
        <table class="dropdown-table">
          <thead>
            <tr>
              <th v-for="(column, index) in columnConfig" :key="index">
                {{ column.columnName }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in filteredOptions"
              :key="index"
              @click="handleSelectOption(item)"
            >
              <td v-for="(column, colIndex) in columnConfig" :key="colIndex">
                {{ item[column.fieldName] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script>
import BaseInput from "../BaseComponent/BaseInputComponent.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

export default {
  name: "ComboboxGrid",
  components: {
    BaseInput,
    Multiselect,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    columnConfig: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      inputValue: "",
      showTable: false,
      isValidInput: true,
      isInputFocused: false,
      selectedOption: null,
    };
  },
  computed: {
    filteredOptions() {
      if (this.inputValue === "") {
        return this.options;
      }
      return this.options.filter(
        (option) =>
          option.bankName
            ?.toLowerCase()
            .includes(this.inputValue.toLowerCase()) ||
          option.name?.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    },
  },
  methods: {
    inputValidator(value) {
      if (!value) {
        this.isValidInput = false;
        return "This field is required";
      }
      if (value.length < 3) {
        this.isValidInput = false;
        return "Must be at least 3 characters";
      }
      this.isValidInput = true;
      return "";
    },
    handleSelectOption(option) {
      this.selectedOption = option;
      this.inputValue = option.name; // Đảm bảo hiển thị thông tin thích hợp trong BaseInput
      this.showTable = false; // Đóng dropdown table sau khi chọn
      this.$emit("input", option); // Thêm dòng này để cập nhật v-model
    },
  },
};
</script>

<style scoped>
.combobox-grid {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.input-with-button {
  display: flex;
  align-items: center;
  border: 1px solid #999;
  border-radius: 2px;
  overflow: hidden;
  flex-grow: 2;
  height: 30px;
  position: relative;
}

.base-input {
  border: none;
  padding: 8px;
  box-sizing: border-box;
  height: 30px;
}

.base-input input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 8px;
}

.input-status {
  color: red;
}

.invalid-input {
  border-color: red;
}

.valid-input {
  border-color: #68c75b;
}

.tooltip {
  border-color: red;
}

.multiselect {
  width: 40px;
  border: none;
}

.dropdown-table-wrapper {
  position: absolute;
  z-index: 500;
  background-color: white;
  width: 50%;
  margin-top: 45px;
}

.dropdown-table {
  width: 70%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.dropdown-table th,
.dropdown-table td {
  padding: 8px;
  text-align: left;
}

.dropdown-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.dropdown-table tr:hover {
  background-color: #68c75b;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}
</style>
