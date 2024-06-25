<template>
  <div class="combobox-grid">
    <div class="input-container">
      <div
        class="input-with-button"
        :class="{ invalid: isInputFocused && !inputValue, valid: inputValue }"
      >
        <input
          v-model="inputValue"
          @input="updateValue($event.target.value)"
          @focus="handleFocus"
          @blur="handleBlur"
          class="base-input"
        />
        <span class="input-status" v-if="isInputFocused && !inputValue">!</span>
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

export default {
  name: "ComboboxGrid",
  components: {
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
      selectedOption: null,
      isInputFocused: false,
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
    updateValue(value) {
      this.inputValue = value;
      this.$emit("input", value);
    },
    handleFocus() {
      this.isInputFocused = true;
    },
    handleBlur() {
      this.isInputFocused = false;
    },
    handleSelectOption(option) {
      this.selectedOption = option;
      this.inputValue = option.name;
      this.showTable = false;
      this.$emit("input", option);
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
  width: calc(100% - 40px);
}

.base-input:focus {
  border: none; /* Đảm bảo không hiển thị viền đen khi được chọn */
  outline: none;
}

.invalid {
  border-color: red;
}

.valid {
  border-color: #68c75b;
}

.input-status {
  color: red;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  background: white;
  border: 1px solid red;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
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
