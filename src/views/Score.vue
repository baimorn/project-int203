<script setup>
import { ref, onBeforeMount } from 'vue'
import ScoreComponent from '../components/ScoreComponent.vue';

const players = ref([]) 
const getPlayers = async () => {
  const res = await fetch('http://localhost:5000/players')
  if (res.status === 200) players.value = await res.json()
  else console.log('not found')
}
onBeforeMount(async () => {
  await getPlayers() 
  console.log(players.value)

})
</script>
 
<template>
<div>
<div id="gameWindow" class="bg-day">
    <div class=" w-full h-screen">
    <div id="board" class="flex flex-row justify-center items-center">
    <p class="w-4/4">Score Board</p>
    </div>
    
    <div id="settingBackground" class="flex flex-row justify-center items-center ">
        <div>
           <ScoreComponent id="list" :players="players"/> 
        </div>
        
    </div>
    
    
    </div>
</div>
    </div>


</template>
 
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

#board {
  font-family: "Press Start 2P";
  font-size: 16px;
  color: azure;
  width: 20%;
  height: 10%;
  min-width: 170px;
  min-height: 140px;
  margin-left: 40%;
  font-size: 1.1vw;
  margin-bottom: -1rem;
  background: url(../assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}

#player{
  color: azure;
  background: url(../assets/image/wood/wood5.png); 
  text-align: center; 
  width: 50px;
}


#settingBackground {
  position: relative;
  background-size: 65%;
  background-position: center;
  background-repeat: no-repeat;
  background-position-y: -100px;
  margin-left: 65px;
  min-width: 10px;
  height: 100%;
  -webkit-animation-name: animatetop; 
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
  
}

#list{
    margin-left: -10px;
    margin-bottom: 13cm;
}
</style>