<template>
  <div class="user-page">
    <div class="header">
      <router-link to="/" class="logo">
        <img src="https://asp.misa.vn/Content/Images/SVG/Logo.svg" alt="Logo" />
      </router-link>
      <h1>Welcome User</h1>
    </div>
    <div class="content">
      <p>This is a user-specific content area.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserComponent',
  data() {
    return {};
  }
};
</script>

<style scoped>
.user-page {
  text-align: center;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 20px;
}

.content {
  margin-top: 20px;
}
</style>
