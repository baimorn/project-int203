<script setup>
import {ref} from "vue";


defineEmits(["selectMode"])
</script>
 
<template>
  <div class="flex flex-row w-full mx-auto justify-center items-center content-center">
          <img
            src="../assets/image/button/btn_easy.png"
            class="difficulty"
            @click="$emit('selectMode',{difficult:2,mode:'Easy'});"
          />
          <img
            src="../assets/image/button/btn_normal.png"
            class="difficulty"
            @click="$emit('selectMode',{difficult:4,mode:'Normal'});"
          />
          <img
            src="../assets/image/button/btn_difficulty.png"
            class="difficulty"
            @click="$emit('selectMode',{difficult:7,mode:'Difficult'});"
          />
  </div>
</template>
 
<style scoped>
.difficulty {
  width: 15%;
  transition: 0.5s ease;
  opacity: 1;
  backface-visibility: hidden;
}
img {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>