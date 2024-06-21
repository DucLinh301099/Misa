<!-- src/components/ControlComponent/ComboboxComponent.vue -->
<template>
  <div v-if="showComponent" class="expense-account-input-wrapper">
    <label for="expense-account-input">
      {{ label }} <span class="required" v-if="isRequired">*</span>
    </label>
    <div class="input-container">
      <div class="input-with-button">
        <BaseInput
          v-model="inputValue"
          :validator="inputValidator"
          class="base-input"
        />
        <button @click="triggerModal" class="add-button">+</button>
        <multiselect
          v-bind="selectedOption"
          :options="filteredOptions"
          :searchable="true"
          :close-on-select="true"
          placeholder=""
          class="multiselect"
          @open="showTable = true"
          @close="showTable = false"
        />
      </div>
      <BaseInput
        v-if="showSecondInput"
        v-model="secondInputValue"
        class="base-input second-input"
        placeholder="Chi nhánh"
      />
      <BaseInput
        v-if="showSecondInput_employee"
        v-model="secondInputValue"
        class="base-input second-input-e"
        placeholder="Chi nhánh"
      />
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
  name: "ComboboxComponent",
  components: {
    BaseInput,
    Multiselect,
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    selectedOption: {
      type: Object,
      default: null,
    },
    options: {
      type: Array,
      default: null,
    },
    selectRow: {
      type: Function,
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
    showSecondInput: {
      type: Boolean,
      default: true,
    },
    showSecondInput_employee: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputValue: "",
      secondInputValue: "",
      showTable: false,
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
        return "This field is required";
      }
      if (value.length < 3) {
        return "Must be at least 3 characters";
      }
      return "";
    },
  },
};
</script>

<style scoped>
.expense-account-input-wrapper {
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
.second-input-e {
  border-radius: 2px;
  padding: 8px;
  box-sizing: border-box;
  height: 37px;
  flex-grow: 1;
  width: 50%;
  margin-left: 15px;
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
