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
          :style="{ visibility: isMultiselectVisible ? 'visible' : 'hidden' }"
          :value="selectedOption"
          @input="updateSelectedOption"
          :options="filteredOptions"
          :searchable="true"
          :close-on-select="true"
          placeholder=""
          class="multiselect"
          @open="onExpandCombox"
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
import paymentConfig from "../../config/PaymentConfig";
import { apiClient } from "../../api/base";

export default {
  name: "ComboboxGrid",
  components: {
    Multiselect,
  },
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
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
      optionsData: this.options != null ? this.options : [],
    };
  },
  computed: {
    config() {
      const config = paymentConfig.comboxConfig[this.endpoint];
      if (!config) {
        console.error(`Configuration for ${this.endpoint} is not found.`);
      }
      return config || {};
    },
    filteredOptions() {
      if (this.inputValue === "") {
        return this.optionsData;
      }

      let displayField = this.columnConfig.find(
        (col) => col.isDisplay
      )?.fieldName;

      return this.optionsData.filter((option) =>
        option[displayField]
          ?.toLowerCase()
          .includes(this.inputValue.toLowerCase())
      );
    },
  },
  methods: {
    async fetchData() {
      if (!this.config) {
        return;
      }
      if (!this.config.endpoint) {
        return;
      }
      try {
        const response = await apiClient[this.config.method](
          this.config.endpoint
        );
        if (
          response.data &&
          Array.isArray(response.data) // Giả định API trả về danh sách các objects
        ) {
          this.optionsData = response.data;
          console.log("optionsData:", this.optionsData);
        } else if (
          response.data &&
          response.data.data && // Giả định API trả về danh sách arrays
          Array.isArray(response.data.data)
        ) {
          this.optionsData = response.data.data;
        } else {
          this.optionsData = [];
        }
      } catch (error) {
        this.optionsData = [];
      }
    },
    async onExpandCombox() {
      await this.fetchData();
      this.showTable = true;
    },
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
      }, 5000);
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
  box-sizing: border-box;
  width: 120px;
}

.base-input {
  border: none;
  padding: 8px;
  box-sizing: border-box;
  height: 30px;
  width: calc(100% - 40px);
  box-sizing: border-box;
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
  z-index: 700;
  background-color: white;
  margin-top: 40px;
  margin-left: 35px;
  transform: translateX(-40px); /* Shift to the left */
  max-height: 200px; /* Set maximum height for the dropdown */
  overflow-y: auto; /* Enable vertical scrolling */
}

.dropdown-table {
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
