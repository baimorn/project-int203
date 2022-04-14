<script setup>
import {ref} from "vue"
defineEmits(['getName'])
defineProps({
  name: {
    type: String,
    default: null
  }
})
// const defaultName = "Unknown"
</script>
 
<template>
  <div id="nameContainer" class="flex flex-row justify-center items-center">
    <p class="w-2/5">Your name :</p>
    <input id="inputName" type="text" class="w-2/5" v-model="name" 
      @change="$emit('getName', name)"
    />
  </div>
</template>
 
<style scoped>
#nameContainer {
  width: 33%;
  height: 20%;
  min-width: 330px;
  min-height: 140px;
  font-size: 1.1vw;
  margin-bottom: -1rem;
  background: url(../assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
#inputName {
  border: 2px solid #7a0916;
  border-radius: 4px;
  background: #961e29;
  text-shadow: 1px 3px 0px rgba(0, 0, 0, 0.94);
}
</style>