<!-- src/components/ControlComponent/CreateEmployeeInput.vue -->
<template>
  <div class="employee-account-input-wrapper">
    <label for="employee-account-input">Nhân viên</label>
    <div class="input-container">
      <div class="input-with-button">
        <BaseInput
          v-model:value="inputValue"
          :validator="inputValidator"
          class="base-input"
        />
        <button @click="openModal" class="add-button">+</button>
        <multiselect
          v-model="selectedOption"
          :options="options"
          :searchable="true"
          :close-on-select="true"
          placeholder=""
          class="multiselect"
        />
      </div>
      <BaseInput
        v-model:value="secondInputValue"
        class="base-input second-input"
      />
    </div>
    <h4 class="text" for="employee-account-input">Tham chiếu chứng từ</h4>

    <Modal :visible="isModalVisible" @close="isModalVisible = false">
      <CreateEmployee @close="isModalVisible = false" />
    </Modal>
  </div>
</template>

<script>
import BaseInput from "../BaseComponent/BaseInputComponent.vue";
import Multiselect from "vue-multiselect";
import Modal from "../BaseComponent/Modal.vue";
import "vue-multiselect/dist/vue-multiselect.css";
import CreateEmployee from "../CreateEmployee.vue";

export default {
  name: "CreateEmployeeInput",
  components: {
    BaseInput,
    Multiselect,
    Modal,
    CreateEmployee,
  },
  data() {
    return {
      inputValue: "",
      secondInputValue: "",
      selectedOption: null,
      options: ["Option 1", "Option 2", "Option 3"],
      isModalVisible: false,
    };
  },
  methods: {
    inputValidator(value) {
      if (!value) {
        return "This field is required";
      }
      if (value.length < 3) {
        return "Must be at least 3 characters";
      }
      return "";
    },
    openModal() {
      this.isModalVisible = true;
    },
  },
};
</script>

<style scoped>
.employee-account-input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
.text {
  font-weight: 400;
}
label {
  margin-bottom: 8px;
  font-weight: bold;
}

.input-container {
  display: flex;
  align-items: center;
}

.input-with-button {
  display: flex;
  align-items: center;
  border: 1px solid #999;
  border-radius: 4px;
  overflow: hidden;
  flex-grow: 2;
  margin-right: 15px;
  height: 35px;
}

.base-input {
  border: none;
  padding: 8px;
  box-sizing: border-box;
  height: 30px;
}

.base-input input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 8px;
}

.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: white;
  cursor: pointer;
  font-size: 24px;
  color: green;
}

.multiselect {
  width: 40px;
  border: none;
  border-left: 1px solid #999;
}

.second-input {
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  height: 37px;
  flex-grow: 1;
  width: 50%;
}
</style>
