<script setup>
import { ref, reactive } from "vue";

let difficulty = ref(1);
let facePerDifficulty = ref(10);
let pageNum = ref(0);
let score = ref(0);
let name = ref("");
let inputName = ref("");

let faceSlots = reactive([0, 0, 0, 0, 0, 0, 0, 0, 0]); // ถ้าไม่มี จะเป็นเลข 0 ถ้ามีหน้า จะเป็น 1 2 3 4 5
let faceStay; // ตัวแปรไว้เก็บ setTimeout
let heart = ref(3); // 0 คือ ไม่มีหัวใจ 1 คือมีหัวใจ

let sounds = {
  background:"gamesound.mp3",
  punch:"punch.mp3"
}

//Menu Page Function
const start = (setDifficulty) => {
  pageNum.value = 1;
  difficulty.value = setDifficulty;
  inputName.value.length > 0 ? name.value = inputName.value : name.value = "Unknown"
  heart.value = 3;
  score.value = 0;
//  playSound(sounds.background,1,false)
  faceSpawn()
};
const faceSpawn = () => {
  setTimeout(function () {
  let randomFace = 1 + Math.floor(Math.random() * 5); // random 1-5
  let randomSlot = Math.floor(Math.random() * 9); // random 0-8
  faceSlots[randomSlot] = randomFace;
  
  //จับเวลาก่อนตุ่นหายไป
  faceStay = setTimeout(function () {
    faceSlots[randomSlot] = 0;
    heart.value--;
    heart.value > 0 ? faceSpawn() : pageNum.value = 2
  }, 4000 / difficulty.value);

  }, 3000 / difficulty.value);
};

const faceHit = (face,index) => {
  if(typeof face === 'string') return;
  clearTimeout(faceStay);
  // testAudio.currentTime = 0
  // testAudio.play()
  playSound("punch.mp3",1,false)
  score.value++;

  faceSlots[index] = `${face}_hit`
  setTimeout(function () {
    faceSlots[index] = 0;
  // }, 600);  พอดีเราอยากให้มันปรับไปตามความเร็ว เพราะบางครั้งเวลามันเร็วมากๆ ละมันเกิดทับกันมัน มันจะมองไม่ออก
  }, 1000 / (difficulty.value / 2));

  // if (score.value % 10 === 0) { difficulty.value += 4 }
  if (score.value % facePerDifficulty.value === 0) { difficulty.value++ }
  faceSpawn(); // เรียกหน้าหลังตี
};

  const playSound = (soundPath,volume,isLoop) => {
    let sound = new Audio(`/src/assets/sound/${soundPath}`)
    sound.volume = volume;
    sound.play();
    
    if(isLoop){
      sound.loop();
    }
  }



</script>

<template>
  <div>
    <iframe src="/src/assets/sound/gamesound.mp3" allow="autoplay" style="display:none"></iframe>
    <div class="flex h-screen">
      <div
        id="background"
        class="flex flex-col justify-center items-center"
        v-show="pageNum === 0"
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
          <img 
            src="./assets/image/button/btn_easy.png"
            class="difficulty"
            @click="start(3)"
          />
          <img
            src="./assets/image/button/btn_normal.png"
            class="difficulty"
            @click="start(5)"
          />
          <img
            src="./assets/image/button/btn_difficulty.png"
            class="difficulty"
            @click="start(8)"
          />
        </div>
      </div>
      <div v-show="pageNum === 1" class="w-full flex flex-col justify-center items-center">
      <div class="w-4/5 flex flex-row justify-between">

        <div class="woodContainer w-1/6 flex flex-col items-center">
          <!-- ใส่ใจที่นี่ -->
        <ul id="heartGrid" class="w-3/5 grid grid-cols-3 justify-left">
            <li v-for="index in heart" :key="index" class="w-full">
              <img id="heart" class="w-full" v-show="index <= heart" src="./assets/image/elements/heart.png"/>
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
      
      <div v-show="pageNum === 2" class="w-full flex flex-col justify-center items-center">
        <div
          id="gameOverText"
          class="flex flex-col w-full mx-auto justify-center items-center content-center"
        >
          <p>Game Over</p>
        </div>
        <div 
          class="flex flex-row w-full mx-auto justify-center items-center content-center"
          style="column-gap: 40px"
        >
          <p>Name: {{name}}</p>
          <p>Score: {{score}}</p>
        </div>
        <div
          id="gameOverText"
          class="flex flex-col w-full mx-auto justify-center items-center content-center"
          @click="pageNum = 0"
        >
          <p>Quit</p>
        </div>

      </div>
        <div>
          <img
          src="./assets/image/set/setting.png"
          class="setting"
          >
        </div>
    </div>
 
  </div>

  
 


</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

* {
  margin:0;
  padding:0;
}

body {
  font-family: "Press Start 2P";
  font-size: 16px;
  text-shadow: 1px 3px 0px rgba(0, 0, 0, 0.94);
  color: white;
  overflow: hidden;
  background: url(./assets/image/background/day.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: bottom;
  background-attachment: fixed;
  cursor: url(./assets/image/click/click1.png) 24 50, auto;
  
  user-drag: none; 
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

img{
    user-drag: none; 
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

body:active {
  cursor: url(./assets/image/click/click2.png) 44 50, auto;
}

#nameContainer {
  /* width: 500px;
  min-height: 140px; */

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

/* #scorebroad {
  min-width: 350px;
  min-height: 140px;
  background: url(./assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
} */

#gameOverText {
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

.difficulty {
  width: 15%;
  transition: 0.5s ease;
  opacity: 1;
  backface-visibility: hidden;
}

.setting {
  width: 20%;
  transition: 0.5s ease;
  opacity: 1;
  backface-visibility: hidden;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 130px;
}

.difficulty:hover {
  cursor: url(./assets/image/click/click2.png) 44 50, auto;
  opacity: 0.5;
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
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  font-size: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
  /* cursor: url(./assets/image/click/click2.png), auto; */
}

.face {
  width: 10vw;

}
</style>
