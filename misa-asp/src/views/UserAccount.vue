<template>
  
    <Header />
    <div id="app" class="app-container">
      
      <div class="main-content">
        <Section />
      </div>
     </div>
    
    <ContactComponent />

    <Footer />
   
</template>

<script>
import Header from '../components/Header.vue';

import ContactComponent from '../components/ContactComponent.vue';
import Footer from '../components/Footer.vue';
import Section from '../components/Section.vue';



export default {
  name: 'UserAccount',
  components: {
    Header,
    Section,
    ContactComponent,
    Footer
  }
}
</script>

<style scoped>
.app-container {
  padding-top: 80px;
  /* Adjust this value based on the height of your header */
}
.main-contain{
  font-family: AvertaStdCY, Helvetica, Arial, sans-serif;
}

/* Global styles for the Home view */
</style>
