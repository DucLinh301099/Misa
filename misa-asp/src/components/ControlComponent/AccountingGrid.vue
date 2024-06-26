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
          object: null,
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
        { columnName: "Đối tượng", fieldName: "object", dataType: "dropdown" },
        {
          columnName: "Tên đối tượng",
          fieldName: "objectName",
          dataType: "text",
        },
      ],
      resources: {
        debitAccount: {
          options: [
            { accountNumber: "1111", accountName: "Tiền Việt Nam" },
            { accountNumber: "1112", accountName: "Ngoại Tệ" },
          ],
          columnConfig: [
            {
              columnName: "Số tài khoản",
              fieldName: "accountNumber",
              isDisplay: true,
              isValue: true,
            },
            { columnName: "Tên tài khoản", fieldName: "accountName" },
          ],
        },
        creditAccount: {
          options: [
            { accountNumber: "1111", accountName: "Tiền Việt Nam" },
            { accountNumber: "1112", accountName: "Ngoại Tệ" },
          ],
          columnConfig: [
            {
              columnName: "Số tài khoản",
              fieldName: "accountNumber",
              isDisplay: true,
              isValue: true,
            },
            { columnName: "Tên tài khoản", fieldName: "accountName" },
          ],
        },
        object: {
          options: [
            {
              object: "KH0001",
              objectName: "Dung",
              code: "0303562",
              address: "Hà Nội",
              phoneNumber: "0388309341",
            },
            {
              object: "KH0002",
              objectName: "Linh",
              code: "0303512",
              address: "Hải Dương",
              phoneNumber: "0977961844",
            },
            {
              object: "KH0003",
              objectName: "Tùng",
              code: "0303582",
              address: "Hà Nội",
              phoneNumber: "0982635679",
            },
          ],
          columnConfig: [
            {
              columnName: "Đối tượng",
              fieldName: "object",
              isDisplay: true,
              isValue: true,
            },
            { columnName: "Tên đối tượng", fieldName: "objectName" },
            { columnName: "Mã số thuế", fieldName: "code" },
            { columnName: "Địa chỉ", fieldName: "address" },
            { columnName: "Điện thoại", fieldName: "phoneNumber" },
          ],
        },
      },
    };
  },
  methods: {
    getOptionsForField(field) {
      if (field === "debitAccount") {
        return this.resources.debitAccount.options;
      } else if (field === "creditAccount") {
        return this.resources.creditAccount.options;
      } else if (field === "object") {
        return this.resources.object.options;
      }
      return [];
    },
    getDropdownColumnConfig(field) {
      if (field === "debitAccount" || field === "creditAccount") {
        return this.resources.debitAccount.columnConfig;
      } else if (field === "object") {
        return this.resources.object.columnConfig;
      }
      return [];
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
        object: null,
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
      if (fieldName === "object") {
        this.rows[rowIndex].objectName = selectedOption.objectName;
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
  height: 33px;
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
