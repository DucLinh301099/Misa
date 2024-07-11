

class RowModel {
  constructor(
    description = "",
    debitAccount = null,
    creditAccount = null,
    amount = "",
    customer = null,
    objectName = ""
  ) {
    this.description = description;
    this.debitAccount = debitAccount;
    this.creditAccount = creditAccount;
    this.amount = amount;
    this.customer = customer;
    this.objectName = objectName;
  }
}

export default RowModel;
