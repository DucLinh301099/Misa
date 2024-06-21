<!-- src/components/InformationInput.vue -->
<template>
  <div class="information-input-wrapper">
    <div class="input-field">
      <label for="so-cmnd">Số CMND</label>
      <div class="input-container">
        <BaseInput
          v-model="soCMND"
          placeholder="Số CMND"
          class="base-input-1"
        />
      </div>
    </div>
    <div class="input-field">
      <label for="ngay-cap">Ngày cấp</label>
      <div class="input-container">
        <BaseInput
          v-model="ngayCap"
          type="date"
          placeholder="dd/mm/yyyy"
          class="base-input-1"
        />
      </div>
    </div>
    <div class="input-field">
      <label for="noi-cap">Nơi cấp</label>
      <div class="input-container">
        <BaseInput
          v-model="noiCap"
          placeholder="Nơi cấp"
          class="base-input-1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "../BaseComponent/BaseInput.vue";

export default {
  name: "InformationInput",
  components: {
    BaseInput,
  },
  data() {
    return {
      soCMND: "",
      ngayCap: "",
      noiCap: "",
    };
  },
};
</script>

<style scoped>
.information-input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 8px;
}

.input-field {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 4px;
  font-weight: bold;
}

.input-container {
  display: flex;
  align-items: center;
}

.base-input-1 {
  width: 100%;
  height: 37px;
  border: 1px solid #999;
  border-radius: 2px;
  padding: 0 8px;
  box-sizing: border-box;
}

.base-input-1 input[type="date"] {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 8px;
}
</style>
