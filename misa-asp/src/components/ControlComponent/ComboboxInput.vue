<template>
  <div v-if="showComponent" class="combobox-account-input-wrapper">
    <label for="expense-account-input">
      {{ label }} <span class="required" v-if="isRequired">*</span>
    </label>
    <div class="input-container">
      <div class="input-with-button">
        <BaseInput
          class="base-input"
          :type="type"
          :value="inputValue"
          @focus="handleFocus"
          @blur="handleBlur"
          @onInput="handleOnInput"
        />
        <button v-if="showButton" @click="triggerModal" class="add-button">
          +
        </button>

        <multiselect
          :value="selectedOption"
          @input="updateSelectedOption"
          :options="filteredOptions"
          :searchable="true"
          :close-on-select="true"
          placeholder=""
          class="multiselect"
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
              @click="selectRow(item)"
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
  name: "ComboboxInput",
  components: {
    BaseInput,
    Multiselect,
  },
  props: {
    selectedRow: {
      type: Object,
      default: null,
    },

    label: {
      type: String,
      default: null,
    },
    selectedOption: {
      type: Object,
      default: null,
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: null,
    },
    columnConfig: {
      type: Array,
      default: null,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    triggerModal: {
      type: Function,
      required: true,
    },
    showComponent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputValue: "",
      secondInputValue: "",
      showTable: false,
      internalSelectedOption: this.selectedOption,
      isInputFocused: false,
    };
  },
  watch: {
    selectedOption(newVal) {
      this.internalSelectedOption = newVal;
    },
    internalSelectedOption(newVal) {
      this.$emit("update:selectedOption", newVal);
    },
  },
  computed: {
    filteredOptions() {
      if (this.inputValue === "") {
        return this.options;
      }

      let displayField = this.columnConfig.find((_) => _.isDisplay)?.fieldName;

      return this.options.filter((option) =>
        option[displayField]
          ?.toLowerCase()
          .includes(this.inputValue.toLowerCase())
      );
    },
  },
  methods: {
    inputValidator(value) {
      if (!value) {
        return "This field is required";
      }
      if (value.length < 3) {
        return "Must be at least 3 characters";
      }
      return "";
    },
    selectRow(item) {
      let displayFirstValue = this.columnConfig.find(
        (_) => _.isDisplay
      )?.fieldName;
      if (displayFirstValue) {
        this.inputValue = item[displayFirstValue];
      }
      let displaySecondValue = this.columnConfig.find(
        (_) => _.isDisplaySecond
      )?.fieldName;
      if (displaySecondValue) {
        this.secondInputValue = item[displaySecondValue];
      }

      this.$emit("update:selectedRow", item);

      this.showTable = false; // đóng table
    },
    handleFocus() {
      this.isInputFocused = true;
    },
    handleBlur() {
      this.isInputFocused = false;
    },
    handleOnInput(val) {
      this.inputValue = val;
    },
  },
};
</script>

<style scoped>
.combobox-account-input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  width: 45%;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}

.input-container {
  display: flex;
  align-items: center;
}

.input-with-button {
  display: flex;
  align-items: center;
  border: 1px solid #999;
  border-radius: 2px;
  overflow: hidden;
  flex-grow: 2;
  height: 35px;
  position: relative;
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
  border: 2px solid #0075c0; /* Thêm viền màu xanh khi focus */
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

.multiselect {
  width: 40px;
  border: none;
  border-left: 1px solid #999;
}

.second-input {
  border: 1px solid #999;
  border-radius: 2px;
  padding: 8px;
  box-sizing: border-box;
  height: 37px;
  flex-grow: 1;
  width: 50%;
  margin-left: 15px;
}
.second-input:focus {
  border: 2px solid #0075c0; /* Thêm viền màu xanh khi focus */
}
.second-input-e {
  border-radius: 2px;
  padding: 8px;
  box-sizing: border-box;
  height: 37px;
  flex-grow: 1;
  width: 50%;
  margin-left: 15px;
}
.second-input-e:focus {
  border: 2px solid #0075c0; /* Thêm viền màu xanh khi focus */
}
.dropdown-table-wrapper {
  position: absolute;
  z-index: 1000;
  background-color: white;
  width: 80%;
  margin-top: 65px;
}

.dropdown-table {
  width: 100%;
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