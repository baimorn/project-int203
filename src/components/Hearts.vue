<script setup>
import {computed} from "vue"
defineEmits(['gameOver'])
const props = defineProps({
  hearts: {
    type: Number,
    default: 3
  }
})

const hearts = computed(() => {
  if(props.hearts === 0) this.$emit("gameOver")
})


</script>
 
<template>
          <div class="woodContainer w-1/6 flex flex-col items-center">
            <ul id="heartGrid" class="w-3/5 grid grid-cols-3 justify-left">
              <li v-for="heart in hearts" :key="heart" class="w-full">
                <img id="heart" class="w-full" src="../assets/image/elements/heart.png" />
              </li>
            </ul>
          </div>
</template>
 
<style scoped>
#heartGrid {
  margin-top: 6%;
}
</style>