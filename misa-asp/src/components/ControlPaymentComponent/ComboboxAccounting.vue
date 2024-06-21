<!-- src/components/ControlComponent/ComboboxAccounting.vue -->
<template>
  <div class="combobox-accounting">
    <select v-model="selectedValue" class="dropdown-select">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <transition name="dropdown">
      <div v-show="showOptions" class="dropdown-table-wrapper">
        <table class="dropdown-table">
          <thead>
            <tr>
              <th v-for="(column, index) in columnConfig" :key="index">
                {{ column.columnName }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(option, index) in options"
              :key="index"
              @click="selectOption(option)"
            >
              <td v-for="(column, colIndex) in columnConfig" :key="colIndex">
                {{ option[column.fieldName] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ComboboxAccounting",
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    columnConfig: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedValue: this.value,
      showOptions: false,
    };
  },
  watch: {
    selectedValue(newValue) {
      this.$emit("input", newValue);
    },
  },
  methods: {
    selectOption(option) {
      this.selectedValue = option.value;
      this.showOptions = false;
    },
  },
};
</script>

<style scoped>
.combobox-accounting {
  position: relative;
}

.dropdown-select {
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  width: 100%;
}

.dropdown-select option {
  padding: 4px;
}

.dropdown-table-wrapper {
  position: absolute;
  z-index: 1000;
  background-color: white;
  width: 100%;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropdown-table {
  width: 100%;
  border-collapse: collapse;
}

.dropdown-table th,
.dropdown-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.dropdown-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.dropdown-table tr:hover {
  background-color: #f1f1f1;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}
</style>
