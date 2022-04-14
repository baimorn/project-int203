<script setup>
import {ref,computed} from "vue"
const props = defineProps({
  faceSlots: {
    type: Array,
    default: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }}
  )
const faceSlots = computed(() => props.faceSlots)
defineEmits(['faceHit'])



</script>
 
<template>
  <div class="w-4/5 flex flex-row justify-between">
          <ul class="grid-container">
          <li v-for="(face, index) in faceSlots" :key="index" class="grid-item h-32">
            <img
              v-if="face !== 0"
              :src="`../src/assets/image/face/face_${face}.png`"
              @mousedown="$emit('faceHit',{'face':face,'position':index})"
              class="face"
            />
          </li>
        </ul>
</div>
</template>
 
<style scoped>
.grid-container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
  column-gap: 20px;
  row-gap: 20px;
  padding: 40px;
}
.grid-item {
  display: flex;
  background: url(../assets/image/elements/soil.png);
  background-size: 100%;
  font-size: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
}
.face {
  width: 10vw;
}
img {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>