<script setup>
defineProps({
  name: {
    type: String,
    default: null
  },
  score: {
    type: Number, 
    default: 0
  }
})
</script>
 
<template>
  <div class="woodContainer w-1/6 h-/6 flex flex-col items-start pt-6 pl-16">
    <p>Name : {{ name }}</p>
    <p>Score : {{ score }}</p>
  </div>
</template>
 
<style scoped>
.woodContainer {
  min-width: 350px;
  min-height: 140px;
  background: url(../assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>