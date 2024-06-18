<!-- src/components/FooterPayment.vue -->
<template>
  <div class="footer-payment">
    <button class="cancel-btn">Hủy</button>

    <div class="dropdown">
      <button class="save-btn">Cất</button>
      <button class="btn save-add-btn">Cất và Thêm</button>
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
  background-color: #2c2c2c;
  padding: 10px 20px;
  position: fixed;
  bottom: 0;
  width: 97%;
}

.btn {
  padding: 10px 20px;
  border: 1px solid #fff;
  border-bottom: none;
  border-left: none;
  border-top: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #4b4b4b;
  color: white;
  padding: 10px 20px;
  border: 0.5px solid #999;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.save-btn {
  background-color: #4b4b4b;
  color: white;
  margin-right: 14px;
  padding: 10px 20px;
  border: 0.5px solid #999;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.save-add-btn {
  background-color: #28a745;
  color: white;
}

.dropdown {
  display: flex;
  align-items: center;
}

.dropdown-toggle {
  padding: 10px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
}
</style>
