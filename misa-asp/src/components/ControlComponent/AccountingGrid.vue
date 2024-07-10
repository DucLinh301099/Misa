<template>
  <div class="accounting-component">
    <label for="accounting" class="accounting">Hạch toán</label>
    <table class="accounting-table">
      <thead>
        <tr>
          <th>#</th>
          <th v-for="(column, index) in columnConfig" :key="index">
            {{ column.columnName }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody class="table-grid">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td>{{ rowIndex + 1 }}</td>
          <td
            class="td-grid"
            v-for="(column, colIndex) in columnConfig"
            :key="colIndex"
          >
            <div
              v-if="
                column.dataType === 'dropdown' &&
                shouldDisplayCombobox(column.fieldName, row)
              "
            >
              <ComboboxGrid
                v-model="row[column.fieldName]"
                :endpoint="getEndpointKeyForField(column.fieldName)"
                :options="getOptionsForField(column.fieldName)"
                :columnConfig="getDropdownColumnConfig(column.fieldName)"
                @update:selectedRow="
                  updateRowField(rowIndex, column.fieldName, $event)
                "
              />
            </div>
            <div v-else>
              <input
                v-model="row[column.fieldName]"
                @input="changeValueInput(rowIndex, column)"
                :class="{
                  'right-align-input': true,
                  focus: isInputFocused(rowIndex, column.fieldName),
                }"
                @focus="handleFocus(rowIndex, column.fieldName)"
                @blur="handleBlur"
              />
            </div>
          </td>
          <td>
            <button @click="removeRow(rowIndex)" v-if="hasRemoveRow">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="accounting-footer">
      <button class="btn-left" @click="addRow">Thêm dòng</button>
      <button class="btn-right" @click="clearRows">Xóa hết dòng</button>
    </div>
  </div>
</template>

<script>
import ComboboxGrid from "../ControlComponent/ComboboxGrid.vue";
import paymentConfig from "../../config/PaymentConfig";

export default {
  name: "AccountingGrid",
  components: {
    ComboboxGrid,
  },
  props: {
    submitTotal: Function,
    changeInputRow: Function,
    modelValue: {
      type: Array,
      default: null,
    },
    hasRemoveRow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      rows: paymentConfig.gridConfig.rows,
      columnConfig: paymentConfig.gridConfig.columnConfig,
      currentTotal: 0,
      focusedCell: { rowIndex: null, fieldName: null },
    };
  },
  watch: {
    rows: {
      deep: true,
      handler() {
        this.updateCurrentTotal();
      },
    },
  },
  methods: {
    getOptionsForField(field) {
      if (field === "debitAccount") {
        return paymentConfig.comboxConfig.debitAccount.options;
      } else if (field === "creditAccount") {
        return paymentConfig.comboxConfig.creditAccount.options;
      } else if (field === "customer") {
        return paymentConfig.comboxConfig.customer.options;
      }
      return [];
    },
    getDropdownColumnConfig(field) {
      if (field === "debitAccount") {
        return paymentConfig.comboxConfig.debitAccount.columnConfig;
      } else if (field === "creditAccount") {
        return paymentConfig.comboxConfig.creditAccount.columnConfig;
      } else if (field === "customer") {
        return paymentConfig.comboxConfig.customer.columnConfig;
      }
      return [];
    },
    getEndpointKeyForField(field) {
      if (field === "customer") {
        return "customer";
      }
      return null;
    },
    shouldDisplayCombobox(field, row) {
      return true;
    },
    addRow() {
      let model = {
        description: "",
        debitAccount: null,
        creditAccount: null,
        amount: "",
        customer: null,
        objectName: "",
      };
      this.rows.push(model);

      this.modelValue.add(model);
    },
    removeRow(index) {
      this.rows.splice(index, 1);
    },
    clearRows() {
      this.rows = [];
    },
    updateRowField(rowIndex, fieldName, selectedOption) {
      this.rows[rowIndex][fieldName] = selectedOption[fieldName];
      if (fieldName === "customer") {
        this.rows[rowIndex].objectId = selectedOption.objectId;
        this.rows[rowIndex].objectName = selectedOption.objectName;
        this.rows[
          rowIndex
        ].description = `Chi tiền cho ${selectedOption.objectName}`;
      }
    },
    handleFocus(rowIndex, fieldName) {
      this.focusedCell = { rowIndex, fieldName };
    },
    handleBlur() {
      this.focusedCell = { rowIndex: null, fieldName: null };
    },
    isInputFocused(rowIndex, fieldName) {
      return (
        this.focusedCell.rowIndex === rowIndex &&
        this.focusedCell.fieldName === fieldName
      );
    },
    changeValueInput(rowIndex, column) {
      let record = this.rows[rowIndex];
      if (record && column && column.dataType) {
        let fieldName = column.fieldName;
        switch (column.dataType) {
          case "currency":
            let value = this.rows[rowIndex][fieldName].replace(/[^\d]/g, "");
            value = value.replace(/^0+/, "") || "0";
            this.rows[rowIndex][fieldName] = value.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            );
            break;
        }
      }

      this.modelValue[rowIndex][column.fieldName] =
        this.record[column.fieldName];

      if (record) {
        this.$emit("changeValueInput", record, column);
      }
    },
    updateCurrentTotal() {
      this.currentTotal = this.rows.reduce(
        (sum, row) =>
          sum + Number(row.amount.toString().replace(/\./g, "") || 0),
        0
      );
    },
  },
};
</script>

<style scoped>
.accounting-component {
  padding-left: 20px;
  padding-right: 20px;
}

.td-grid {
  height: 40px;
}

.right-align-input.focus {
  border-color: green;
}

.btn-left {
  margin-right: 15px;
  border: 0.5px solid #999;
  width: 150px;
  background-color: #fff;
  font-weight: bold;
}

.btn-right {
  border: 0.5px solid #999;
  width: 150px;
  background-color: #fff;
  font-weight: bold;
}

.accounting {
  margin-bottom: 16px;
  font-weight: bold;
  color: #0075c0;
  font-weight: 700;
  text-decoration: underline;
}

.accounting-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  margin-top: 8px;
}

.accounting-table th {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.accounting-table td {
  border: 1px solid #ccc;
  padding: 0px 10px 0px 10px;
  text-align: left;
}

.accounting-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.accounting-table input,
.accounting-table select {
  width: 100%;
  border: 1px solid #ccc;
  padding: 4px;
  box-sizing: border-box;
  height: 30px;
  border-radius: 2px;
  outline: none;
}

.dropdown-select-a {
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 2px;
  height: 30px;
}

.dropdown-select option {
  padding: 4px;
}

.accounting-footer {
  display: flex;
  justify-content: flex-start;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 2.5px;
  cursor: pointer;
  background-color: #fff;
}

button:hover {
  background-color: #ddd;
}
</style>
