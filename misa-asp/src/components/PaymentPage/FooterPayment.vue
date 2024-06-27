<template>
  <div class="footer-payment">
    <button class="cancel-btn">Hủy</button>

    <div class="dropdown">
      <button class="save-btn">Cất</button>
      <button class="btn save-add-btn">Cất và In</button>
      <button class="dropdown-toggle">&#9660;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterPayment",
};
</script>

<style scoped>
.footer-payment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #38393d;
  padding: 10px 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #38393d; /* Màu nền thay đổi */
  color: white;
  padding: 10px 20px;
  border: 1px solid #6b6c72; /* Loại bỏ viền */
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
}

.save-btn {
  background-color: #38393d; /* Màu nền thay đổi */
  color: white;
  margin-right: 10px;
  padding: 10px 20px;
  border: 1px solid #6b6c72; /* Loại bỏ viền */
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
}

.save-add-btn {
  background-color: #28a745; /* Màu nền thay đổi */
  color: white;
  border: none; /* Loại bỏ viền */
  border-radius: 4px 0 0 4px;
}

.dropdown {
  display: flex;
  align-items: center;
  margin-right: 45px;
}

.dropdown-toggle {
  padding: 10px;
  border: 1px solid #fff;
  border-top: none;
  border-right: none;
  border-bottom: none;
  background-color: #28a745; /* Màu nền thay đổi */
  color: white;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
}
</style>
