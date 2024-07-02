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
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td>{{ rowIndex + 1 }}</td>
          <td v-for="(column, colIndex) in columnConfig" :key="colIndex">
            <div
              v-if="
                column.dataType === 'dropdown' &&
                shouldDisplayCombobox(column.fieldName, row)
              "
            >
              <ComboboxGrid
                v-model="row[column.fieldName]"
                :apiEndpointKey="getEndpointKeyForField(column.fieldName)"
                :options="getOptionsForField(column.fieldName)"
                :columnConfig="getDropdownColumnConfig(column.fieldName)"
                @update:selectedRow="
                  updateRowField(rowIndex, column.fieldName, $event)
                "
              />
            </div>
            <div v-else>
              <input v-model="row[column.fieldName]" />
            </div>
          </td>
          <td><button @click="removeRow(rowIndex)">🗑️</button></td>
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
import apiConfig from "../../config/apiConfig";

export default {
  name: "AccountingGrid",
  components: {
    ComboboxGrid,
  },
  data() {
    return {
      rows: [
        {
          description: "",
          debitAccount: null,
          creditAccount: null,
          amount: 0,
          customer: null,
          objectName: "",
        },
      ],
      columnConfig: [
        { columnName: "Diễn giải", fieldName: "description", dataType: "text" },
        {
          columnName: "TK Nợ",
          fieldName: "debitAccount",
          dataType: "dropdown",
        },
        {
          columnName: "TK Có",
          fieldName: "creditAccount",
          dataType: "dropdown",
        },
        { columnName: "Số tiền", fieldName: "amount", dataType: "currency" },
        {
          columnName: "Đối tượng",
          fieldName: "customer",
          dataType: "dropdown",
        },
        {
          columnName: "Tên đối tượng",
          fieldName: "objectName",
          dataType: "text",
        },
      ],
    };
  },
  methods: {
    getOptionsForField(field) {
      if (field === "debitAccount") {
        return apiConfig.debitAccount.options;
      } else if (field === "creditAccount") {
        return apiConfig.creditAccount.options;
      } else if (field === "customer") {
        return [];
      }
      return [];
    },
    getDropdownColumnConfig(field) {
      if (field === "debitAccount") {
        return apiConfig.debitAccount.columnConfig;
      } else if (field === "creditAccount") {
        return apiConfig.creditAccount.columnConfig;
      } else if (field === "customer") {
        return apiConfig.customer.columnConfig;
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
      this.rows.push({
        description: "",
        debitAccount: null,
        creditAccount: null,
        amount: 0,
        customer: null,
        objectName: "",
      });
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
        this.rows[rowIndex].objectName = selectedOption.objectName;
        this.rows[
          rowIndex
        ].description = `chi tiền cho ${selectedOption.objectName}`;
      }
    },
  },
};
</script>

<style scoped>
.accounting-component {
  padding-left: 20px;
  padding-right: 20px;
}
.btn-left {
  margin-right: 15px;
  border: 0.5px solid #999;
  width: 150px;
  background-color: #fff;
}
.btn-right {
  border: 0.5px solid #999;
  width: 150px;
  background-color: #fff;
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

.accounting-table th,
.accounting-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.accounting-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.accounting-table input,
.accounting-table select {
  width: 100%;
  border: 1px solid #999;
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
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}
</style>
