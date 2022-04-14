<script setup>
defineProps({
  name: {
    type: String,
    default: null
  },
  score: {
    type: Number, 
    default: 0
  },
  difficultText: {
    type: String,
    default: null
  }
})
</script>
 
<template>
<div>
        <div class="gameOverBanner flex w-2/5 mx-auto justify-center items-center content-center">
          <p class="text-2xl">Game Over</p>
        </div>
        <div class="gameOverText flex flex-col mx-auto justify-center items-center content-center gap-y-2">
          <p>Difficulty: {{ difficultText }}</p>
          <p>Name: {{ name }}</p>
          <p>Score: {{ score }}</p>
        </div>

        <!-- <div class="flex flex-row w-1/3 justify-center">
          <img
            src="../assets/image/button/restart.png"
            class="settings"
            v-show="pageNumber === 2"
            @click="restart(); playClickSound();"
          />
          <img
            src="../assets/image/button/home.png"
            class="settings"
            v-show="pageNumber === 2"
            @click="backToMenu(); playClickSound();"
          />
        </div> -->
</div>
</template>
 
<style scoped>
.gameOverBanner {
  width: 33%;
  height: 20%;
  min-width: 330px;
  min-height: 140px;
  font-size: 1.5vw;
  margin-bottom: -2.5rem;
  background: red;
  background: url(../assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.gameOverText {
  width: 33%;
  height: 20%;
  min-width: 650px;
  min-height: 180px;
  padding-bottom: 8px;
  margin-bottom: -2.5rem;
  background: red;
  background: url(../assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
</style>