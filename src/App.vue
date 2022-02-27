<script setup>
import { ref, reactive } from "vue";

let bgSound = null;

let difficulty = ref(1);
let soundVolume = ref(80);
let pageNumber = ref(0);
let isShowSetting = ref(false);
let isGameOver = ref(true);

let heart = ref(3); 
let score = ref(0);
let name = ref("");

let inputName = ref("");
let initDiff = ref(0);    // ไว้ใช้กะปุ่ม restart
let initDiffString = ref("");

let gameRun; //เก็บ interval ที่เป็นการทำงานของเกม
let faceSlots = reactive([0, 0, 0, 0, 0, 0, 0, 0, 0]); // ถ้าไม่มี จะเป็นเลข 0 ถ้ามีหน้า จะเป็น 1 2 3 4 5
let faceStay; // ตัวแปรไว้เก็บ setTimeout

let backgrounds = reactive(["bg-day","bg-night"]);
let selectedBackground = ref(0);

let sounds = {
  background:"gamesound.mp3",
  punch:"punch.mp3",
  heart:"heart.mp3",
  gameover:"gameover.mp3",
}

//Menu Page Function
const start = (setDifficulty, setDifficultyString) => {
  if(bgSound === null) {bgSound = playSound(sounds.background, 0.2, true)
    bgSound.defaultVolume = 0.2;
  }
  pageNumber.value = 1;
  initDiff.value = setDifficulty;
  initDiffString.value = setDifficultyString;
  difficulty.value = initDiff.value;

  inputName.value.length > 0 ? name.value = inputName.value : name.value = "Unknown";
  heart.value = 3;
  score.value = 0;
  isGameOver.value = false;

  gameRun = setInterval(function() {
    faceSpawn();
    if(difficulty.value % 10) difficulty.value+=0.3;
  }, 8000 / difficulty.value);
  
};

const restart = () => {
  if(!isGameOver.value) gameOver();
  console.log(faceSlots)
  start(initDiff.value, initDiffString.value);  // restart เร็วเกินบัคครับ
}

const backToMenu = () => {
  if(!isGameOver.value) gameOver();
  pageNumber.value = 0;
}

const faceSpawn = () => {
  let randomFace = 1 + Math.floor(Math.random() * 5); // random 1-5
  let randomSlot = Math.floor(Math.random() * 9); // random 0-8
  faceSlots[randomSlot] = randomFace;

  faceStay = setTimeout(function () {
    faceSlots[randomSlot] = 0;
    if(heart.value === 1 && !isGameOver.value) {
      gameOver();
    }else {
      playSound(sounds.heart, 0.1, false);
      heart.value--;
    };
  }, 4000 / difficulty.value);
};

const faceHit = (face,index) => {
  if(typeof face === 'string') return;
  clearTimeout(faceStay);
  playSound(sounds.punch, 0.4, false)
  score.value++;
  faceSlots[index] = `${face}_hit`

  setTimeout(function () {
    faceSlots[index] = 0;
  }, 2000 / difficulty.value);
};

const playSound = (soundPath, volume, isLoop) => {
  let sound = new Audio(`/src/assets/sound/${soundPath}`)
  sound.volume = volume * soundVolume.value/100;
  sound.play();
  
  if(isLoop){ sound.loop = true };
  return sound;
}

const gameOver = () => {
  let bgSoundVolume = bgSound.volume;
  bgSound.volume = 0;
  playSound(sounds.gameover, 0.3, false)

  clearInterval(gameRun);
  isGameOver.value = true;
  pageNumber.value = 2;

  setTimeout(() => {
    bgSound.volume = bgSoundVolume;
  },3000);
}

const changeBackgroundVolume = () => {
    if(bgSound !== null) bgSound.volume = bgSound.defaultVolume * soundVolume.value/100;
}

const toggleSetting = () => {
    isShowSetting.value = !isShowSetting.value ;
}
</script>

<template>
  <div id="gameWindow" :class="backgrounds[selectedBackground]">
    <div class="a flex w-full h-screen" > 
      <div
        id="background"
        class="flex flex-col justify-center items-center"
        v-show="pageNumber === 0"
      >
        <img src="./assets/image/logo/logo.png" class="w-1/3" />
        <div
          id="nameContainer"
          class="flex flex-row justify-center items-center"
        >
          <p class="w-2/5">Your name :</p>
          <input
            id="input_name"
            type="text"
            class="w-2/5"
            v-model="inputName"
          />
        </div>
        <div class="flex flex-row w-full mx-auto justify-center items-center content-center">
          <img src="./assets/image/button/btn_easy.png"
            class="difficulty"
            @click="start(2,'Easy')"
          />
          <img src="./assets/image/button/btn_normal.png"
            class="difficulty"
            @click="start(4,'Normal')"
          />
          <img src="./assets/image/button/btn_difficulty.png"
            class="difficulty"
            @click="start(7,'Difficult')"
       />
        </div>
      </div>
      
      <div v-show="pageNumber === 1" class="w-full flex flex-col justify-center items-center">
        <div class="w-4/5 flex flex-row justify-between">
          <div class="woodContainer w-1/6 flex flex-col items-center">
            <ul id="heartGrid" class="w-3/5 grid grid-cols-3 justify-left">
              <li v-for="index in heart" :key="index" class="w-full">
                <img id="heart" class="w-full" src="./assets/image/elements/heart.png"/>
              </li>
            </ul>
          </div>
          <div class="woodContainer w-1/6 h-/6 flex flex-col items-start pt-6 pl-16">
            <p>Name : {{ name }}</p> 
            <p>Score : {{ score }}</p>
          </div>
        </div>
        <ul class="grid-container">
          <li v-for="(face,index) in faceSlots" :key="index" class="grid-item">
            <img v-if="face !== 0" :src="`/src/assets/image/face/face_${face}.png`" @mousedown="faceHit(face,index)" class="face"/>
          </li>
        </ul>
      </div>
      
      <div v-show="pageNumber === 2" class="w-full flex flex-col justify-center items-center gap-y-3">
        <div
          class="gameOverText flex w-2/5 mx-auto justify-center items-center content-center "
        >
          <p class="text-2xl">Game Over</p>
        </div>
        
        <div class="flex flex-col w-1/3 mx-auto justify-center items-center content-center gap-y-2">
          <p>Difficulty: {{initDiffString}}</p>
          <p>Name: {{name}}</p>
          <p>Score: {{score}}</p>
        </div>

        <div class="flex flex-row w-1/3 justify-center">
          <img src="./assets/image/button/restart.png"
            class="settings"
            v-show="pageNumber === 2"
            @click="restart()"
          />
          <img src="./assets/image/button/home.png"
            class="settings"
            v-show="pageNumber === 2"
            @click="backToMenu()"
          />
        </div>
     
      </div>
      
      <div class="settingsContainer flex flex-row">
        <img src="./assets/image/button/setting.png"
          class="settings"
          @click="toggleSetting()"
        />
      </div>
    </div>
    
     <div id="settingBroad" class="top-0 w-full h-full absolute flex justify-center" v-show="isShowSetting" >
    <div id="settingBackground" class="flex flex-col gap-y-6 items-center pt-36 w-4/6">
     <span class="w-1/6 close text-3xl absolute right-28" @click="toggleSetting()">&times;</span>
    <div id="settingTopic" class="flex flex-row items-center">
      <h2 class="text-2xl">SETTINGS</h2>
    </div>

    <div class="flex flex-col items-start w-3/6 gap-y-2">
      <p>Change Background : </p>
      <div class="flex flex-row">
      <li v-for="(background,index) in backgrounds" :key="index" class="flex flex-col w-1/4 list-none">
            <img :src="`/src/assets/image/background/${background}_icon.png`" @click="selectedBackground = index"/>
          </li>
      </div>

      <p>Volume : </p>
      <div id="volumeSetting" class="grid w-full justify-center">
      <input v-model="soundVolume" type="range" min="0" max="100" class="w-5/6" id="volumeSlider" @change="changeBackgroundVolume()">
      <p>{{soundVolume}}</p>
    </div>
    </div>
    
    <div v-show="!isGameOver" class="bottom-40 absolute flex flex-row justify-center gap-x-8">
      <img src="./assets/image/button/restart.png" class="settingsModal" @click="restart(); toggleSetting()"/>
      <img src="./assets/image/button/home.png" class="settingsModal" @click="backToMenu(); toggleSetting()"/>
     
          </div>
        </div>
    </div>

  
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");


#settingBroad {
  background-color: rgba(0,0,0,0.4); 
}

/* Modal Content */
#settingBackground {
  position: relative;
  background: url(./assets/image/wood/wood5.png);
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  min-width:1000px;
  height: 100%;
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: #ffffff;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.settingsModal {
  transition: 0.5s ease;
  opacity: 1;
  width: 12%;
  display: inline;
  text-align: center;
}

.settingsModal:hover {
  cursor: url(./assets/image/click/click2.png) 44 50, auto;
  opacity: 0.6;
}

#volumeSetting {
  grid-template-columns: 90% 10%;
}

#gameWindow {
  font-family: "Press Start 2P";
  font-size: 16px;
  text-shadow: 1px 3px 0px rgba(0, 0, 0, 0.94);
  color: white;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: bottom;
  background-attachment: fixed;
  cursor: url(./assets/image/click/click1.png) 24 50, auto;
  
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.bg-day {
  background: url(./assets/image/background/bg-day.jpg);
}

.bg-night {
  background: url(./assets/image/background/bg-night.jpg);
}

img{
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

#gameWindow:active {
  cursor: url(./assets/image/click/click2.png) 44 50, auto;
}

#nameContainer {
  width: 33%;
  height: 20%;
  min-width: 330px;
  min-height: 140px;
  font-size: 1.1vw;
  margin-bottom: -1rem;
  background: url(./assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}

#input_name {
  border: 2px solid #7a0916;
  border-radius: 4px;
  background: #961e29;
  text-shadow: 1px 3px 0px rgba(0, 0, 0, 0.94);
}

.woodContainer {
  min-width: 350px;
  min-height: 140px;
  background: url(./assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
}

#heartGrid {
  margin-top:6%;
}

#heart {
  min-width: 50px;
  min-height: 50px;
  width: 30%;
}

.gameOverText {
  width: 33%;
  height: 20%;
  min-width: 330px;
  min-height: 140px;
  font-size: 1.5vw;
  margin-bottom: -1rem;
  background: red;
  background: url(./assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}

.settingsContainer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 420px;
  justify-content: right;
}

.settings {
  width: 20%;
  transition: 0.5s ease;
  opacity: 1;
  backface-visibility: hidden;
  width: 140px;
  padding-right: 10px;
}

.settings:hover {
  cursor: url(./assets/image/click/click2.png) 44 50, auto;
  opacity: 0.6;
}

.difficulty {
  width: 15%;
  transition: 0.5s ease;
  opacity: 1;
  backface-visibility: hidden;
}

.difficulty:hover {
  cursor: url(./assets/image/click/click2.png) 44 50, auto;
  opacity: 0.6;
}

.grid-container {
  display: grid;
  width: 50%;
  height: 70%;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
  column-gap: 20px;
  row-gap: 20px;
  padding: 40px;
}

.grid-item {
  display: flex;
  background: url(./assets/image/elements/soil.png);
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



</style>
