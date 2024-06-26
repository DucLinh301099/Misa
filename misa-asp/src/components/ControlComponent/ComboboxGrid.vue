<template>
  <div class="combobox-grid">
    <div class="input-container">
      <div
        class="input-with-button"
        :class="{ invalid: isInputFocused && !inputValue, valid: inputValue }"
      >
        <input
          v-model="inputValue"
          :value="inputValue"
          :type="type"
          @input="updateInputValue"
          @focus="handleFocus"
          @blur="handleBlur"
          class="base-input"
        />
        <div
          class="input-status-container"
          v-if="isInputFocused && !inputValue"
        >
          <span class="input-status">!</span>
          <span class="tooltip">Tài khoản không được để trống.</span>
        </div>
        <multiselect
          v-show="isMultiselectVisible"
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
    selectedRow: {
      type: Object,
      default: null,
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
      isInputFocused: false,
      isMultiselectVisible: false,
    };
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
    handleFocus() {
      this.isInputFocused = true;
      this.isMultiselectVisible = true;
    },
    handleBlur() {
      this.isInputFocused = false;
      // Sử dụng timeout để đảm bảo rằng multiselect không bị ẩn ngay lập tức
      setTimeout(() => {
        if (!this.isInputFocused) {
          this.isMultiselectVisible = false;
        }
      }, 2000);
    },

    selectRow(item) {
      let displayValue = this.columnConfig.find((_) => _.isDisplay)?.fieldName;
      if (displayValue) {
        this.inputValue = item[displayValue];
      }

      this.$emit("update:selectedRow", item);

      this.showTable = false;
      this.isMultiselectVisible = false;
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
  border: none;
  outline: none;
}

.invalid {
  border-color: red;
}

.valid {
  border-color: #68c75b;
}

.input-status-container {
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
}

.input-status {
  color: red;
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
  cursor: pointer;
  position: relative;
}

.tooltip {
  visibility: hidden;
  background-color: #f44336;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
  width: 160px;
}

.input-status-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
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
