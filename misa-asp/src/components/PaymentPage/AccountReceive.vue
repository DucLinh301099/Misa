<!-- src/components/ControlComponent/AccountReceive.vue -->
<template>
  <div class="receive-account-input-wrapper">
    <label for="receive-account-input">Tài khoản nhận</label>
    <div class="input-container">
      <div class="input-with-button">
        <BaseInput
          v-model="inputValue"
          :validator="inputValidator"
          class="base-input"
        />
        <button @click="showModal" class="add-button">+</button>
        <multiselect
          v-model="selectedOption"
          :options="filteredOptions"
          :searchable="true"
          :close-on-select="true"
          label="accountNumber"
          track-by="accountNumber"
          placeholder=""
          class="multiselect"
          @open="showTable = true"
          @close="showTable = false"
        />
      </div>
      <BaseInput
        v-model="secondInputValue"
        class="base-input second-input"
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
              v-for="(account, index) in filteredOptions"
              :key="index"
              @click="selectOption(account)"
            >
              <td v-for="(column, colIndex) in columnConfig" :key="colIndex">
                {{ account[column.fieldName] }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-if="filteredOptions.length === 0">
              <td :colspan="columnConfig.length" class="no-data">
                Không có dữ liệu hiển thị.
              </td>
            </tr>
          </tfoot>
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
  name: "AccountReceive",
  components: {
    BaseInput,
    Multiselect,
  },
  data() {
    return {
      inputValue: "",
      secondInputValue: "",
      selectedOption: null,
      options: [
        {
          accountNumber: "100871906534",
          bankName: "Ngân hàng TMCP Ngoại thương Việt Nam",
          branch: "Hai Bà Trưng",
        },
        {
          accountNumber: "0344039457",
          bankName: "Ngân hàng TMCP An Bình",
          branch: "",
        },
      ],
      showTable: false,
      columnConfig: [
        { columnName: "Số tài khoản", fieldName: "accountNumber" },
        { columnName: "Tên ngân hàng", fieldName: "bankName" },
        { columnName: "Chi nhánh", fieldName: "branch" },
      ],
    };
  },
  computed: {
    filteredOptions() {
      if (this.inputValue === "") {
        return this.options;
      }
      return this.options.filter((option) =>
        option.bankName.toLowerCase().includes(this.inputValue.toLowerCase())
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
    showModal() {
      // Logic to show modal
    },
    selectOption(option) {
      this.selectedOption = option;
      this.inputValue = option.accountNumber;
      this.secondInputValue = option.branch;
      this.showTable = false;
    },
  },
};
</script>

<style scoped>
.receive-account-input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
.address {
  margin-left: 200px;
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
  margin-right: 15px;
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
  width: 40px; /* You can adjust the width as needed */
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
}

.dropdown-table-wrapper {
  position: absolute;
  z-index: 1000;
  background-color: white;
  width: 80%;
  margin-top: 65px;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.31s ease-in-out;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
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

.no-data {
  text-align: center;
  color: #888;
  padding: 16px;
}
</style>
