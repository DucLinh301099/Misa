<!-- src/components/AccountingComponent.vue -->
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
            <div v-if="column.dataType === 'dropdown'">
              <ComboboxAccounting
                v-model="row[column.fieldName]"
                :options="getOptionsForField(column.fieldName)"
                :columnConfig="dropdownColumnConfig"
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
import ComboboxAccounting from "../ControlPaymentComponent/ComboboxAccounting.vue";

export default {
  name: "AccountingComponent",
  components: {
    ComboboxAccounting,
  },
  data() {
    return {
      rows: [
        {
          description: "",
          debitAccount: "1111",
          creditAccount: "1122",
          amount: 0,
          object: "",
          objectName: "",
        },
      ],
      columnConfig: [
        {
          columnName: "Diễn giải",
          fieldName: "description",
          dataType: "text",
        },
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
        {
          columnName: "Số tiền",
          fieldName: "amount",
          dataType: "currency",
        },
        {
          columnName: " Đối tượng",
          fieldName: "object",
          dataType: "dropdown",
        },
        {
          columnName: "Tên đối tượng",
          fieldName: "objectName",
          dataType: "text",
        },
      ],
      accountOptions: [
        { value: "1121", label: "1121 - Tiền Việt Nam" },
        { value: "1122", label: "1122 - Ngoại tệ" },
        { value: "1111", label: "1111 - Tài khoản" },
      ],
      objectOptions: [
        { value: "1", label: "Đối tượng 1" },
        { value: "2", label: "Đối tượng 2" },
      ],
      dropdownColumnConfig: [
        { columnName: "Số tài khoản", fieldName: "value" },
        { columnName: "Tên tài khoản", fieldName: "label" },
      ],
    };
  },
  methods: {
    getOptionsForField(field) {
      if (field === "debitAccount" || field === "creditAccount") {
        return this.accountOptions;
      } else if (field === "object") {
        return this.objectOptions;
      }
      return [];
    },
    addRow() {
      this.rows.push({
        description: "",
        debitAccount: "1111",
        creditAccount: "1122",
        amount: 0,
        object: "",
        objectName: "",
      });
    },
    removeRow(index) {
      this.rows.splice(index, 1);
    },
    clearRows() {
      this.rows = [];
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
  border: none;
  padding: 4px;
  box-sizing: border-box;
}

.dropdown-select {
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
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
