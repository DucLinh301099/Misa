<!-- src/components/SummaryComponent.vue -->
<template>
  <div class="summary-component">
    <div class="total-label">Tổng tiền</div>
    <div class="total-amount">{{ totalAmount }}</div>
  </div>
</template>

<script>
export default {
  name: "SummaryComponent",
  data() {
    return {
      totalAmount: 0,
    };
  },
};
</script>

<style scoped>
.summary-component {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
}

.total-label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.total-amount {
  font-size: 36px;
  font-weight: bold;
}
</style>
