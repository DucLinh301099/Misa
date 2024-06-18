<!-- src/components/AccountingComponent.vue -->
<template>
  <div class="accounting-component">
    <label for="accounting" class="accounting">Hạch toán</label>
    <table class="accounting-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Diễn giải</th>
          <th>TK Nợ</th>
          <th>TK Có</th>
          <th>Số tiền</th>
          <th>Đối tượng</th>
          <th>Tên đối tượng</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ index + 1 }}</td>
          <td><input v-model="row.description" /></td>
          <td><input v-model="row.debitAccount" /></td>
          <td><input v-model="row.creditAccount" /></td>
          <td><input v-model="row.amount" type="number" /></td>
          <td><input v-model="row.object" /></td>
          <td><input v-model="row.objectName" /></td>
          <td><button @click="removeRow(index)">🗑️</button></td>
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
export default {
  name: "AccountingComponent",
  data() {
    return {
      rows: [
        {
          description: "",
          debitAccount: "",
          creditAccount: "1121",
          amount: 0,
          object: "",
          objectName: "",
        },
      ],
    };
  },
  methods: {
    addRow() {
      this.rows.push({
        description: "",
        debitAccount: "",
        creditAccount: "",
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

.accounting-table input {
  width: 100%;
  border: none;
  padding: 4px;
  box-sizing: border-box;
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
