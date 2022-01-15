<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HomeComp />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComp from '@/components/Home.vue';

export default {
  name: 'Home',
  components: {
    HomeComp,
  },
};
</script>
