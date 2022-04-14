
<script setup>

</script>
 
<template>
  <div>
    <div class="banner">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Score' }">Score Board</router-link> |
      <router-link :to="{ name: 'About' }">About Us</router-link> 
    </div>
    <div>
      <router-view> </router-view>
    </div>
  </div>
</template>
 
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
a:hover {
  opacity: 0.8;
}
.banner {
  padding-left: 10px;
  text-shadow: 1px 3px 0px rgba(150, 30, 41, 0.90);
  font-family: "Press Start 2P";
  font-size: 16px;
  color: greenyellow;
  background: #961e29;
  background: url(./assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 200%;
  background-position: center;
}
</style>