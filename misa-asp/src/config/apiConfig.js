// apiConfig.js
const apiConfig = {
  bankExpense: {
    endpoint: 'BankAccount/bankAccount/1',
    method: 'get',
    roleId: null,
    columnConfig: [
      {
            columnName: "Số tài khoản",
            fieldName: "accountNumber",
            isValue: true,
            isDisplay: true,
          },
          {
            columnName: "Tên ngân hàng",
            fieldName: "bankName",
            isDisplaySecond: true,
            isValue: true,
          },
          { columnName: "Chi nhánh", fieldName: "branch" },
    ],
    params: {}
  },
  bankReceive: {
    endpoint: 'BankAccount/bankAccount/2',
    method: 'get',
   
     columnConfig: [
         {
            columnName: "Số tài khoản",
            fieldName: "accountNumber",
            isDisplay: true,
            isValue: true,
          },
          { columnName: "Tên ngân hàng", fieldName: "bankName" },
          {
            columnName: "Chi nhánh",
            fieldName: "branch",
            isDisplaySecond: true,
            isValue: true,
          },
    ],
    params: {}
  },
  employee: {
    endpoint: 'Account/employee',
    method: 'get',
    roleId: null,
    columnConfig: [
       { columnName: 'Mã nhân viên', fieldName: 'employeeCode', isDisplay: true, isValue: true, },
       { columnName: 'Tên nhân viên', fieldName: 'employeeName' },
       { columnName: "Đơn vị", fieldName: "department" },
       { columnName: "ĐT di động", fieldName: "mobilePhone" },
      // Thêm các cột khác nếu cần
    ],
    params: {}
  },
  customer: {
    endpoint: 'Customer/customer',
    method: 'get',
    roleId: null,
    columnConfig: [
       { columnName: "Đối tượng", fieldName: "objectId" },
          {
            columnName: "Tên đối tượng",
            fieldName: "objectName",
            isDisplay: true,
            isValue: true,
          },
          { columnName: "Mã số thuế", fieldName: "taxCode" },
          {
            columnName: "Địa chỉ",
            fieldName: "address",
            isDisplaySecond: true,
            isValue: true,
          },
          { columnName: "Điện thoại", fieldName: "phoneNumber" },
    ],
  }
  // Thêm các cấu hình khác nếu cần
};

export default apiConfig;
