<script setup>
import { ref, reactive } from "vue";

let difficulty = ref(1);
let frontPage = ref(true);
let score = ref(0);
let name = ref("");
let inputName = ref("");

let faceSlots = reactive([0, 0, 0, 0, 0, 0, 0, 0, 0]); // ถ้าไม่มี จะเป็นเลข 0 ถ้ามีหน้า จะเป็น 1 2 3 4 5
let faceStay; // ตัวแปรไว้เก็บ setTimeout
let hearts = ref("3"); // 0 คือ ไม่มีหัวใจ 1 คือมีหัวใจ
// const faces = [
//   {
//     src:"/src/assets/image/face/face_1.png",
//     srcHit:"/src/assets/image/face/face_1_hit.png"
//   },
//   {
//     src:"/src/assets/image/face/face_2.png",
//     srcHit:"/src/assets/image/face/face_2_hit.png"
//   },
//   {
//     src:"/src/assets/image/face/face_3.png",
//     srcHit:"/src/assets/image/face/face_3_hit.png"
//   },
//   {
//     src:"/src/assets/image/face/face_4.png",
//     srcHit:"/src/assets/image/face/face_4_hit.png"
//   },
//   {
//     src:"/src/assets/image/face/face_5.png",
//     srcHit:"/src/assets/image/face/face_5_hit.png"
//   }
// ]

//Menu page function
const start = (setDifficulty) => {
  frontPage.value = !frontPage;
  difficulty.value = setDifficulty;
  name.value = inputName.value;
  hearts.value = 3;
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
    score.value--;
    hearts--;
    faceSpawn();
  }, 4000 / difficulty.value);
  // setTimeout(function () {
  //   /* เวลาหมด เรียกหน้า อาจเช็คเป็นสถานะแทน */
  // }, 4000 / difficulty.value);
  console.log(faceSlots)
  }, 3000 / difficulty.value);
};

const faceHit = (index) => {
  clearTimeout(faceStay);
  score.value++;

  faceSlots[index] = 0;
  // กดโดน หน้าเปลี่ยน อาจเช็คเป็นสถานะแทน
  // setTimeout(function () {
  //   /* เวลาหมด ลบหน้า */
  // }, 1000 / difficulty.value);

      faceSpawn(); // เรียกหน้าหลังตี
};

const randomFace = () => {
  return require('')
}

const gameOver = () => {};

const quit = () => {};
</script>

<template>
  <div class>
    <div class="flex h-screen">
      <div
        id="background"
        class="flex flex-col justify-center items-center"
        v-show="frontPage"
      >
        <img src="./assets/image/logo/logo.png" class="w-1/6" />
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
        <div
          class="flex flex-row w-full mx-auto justify-center items-center content-center"
        >
          <img
            src="./assets/image/button/btn_easy.png"
            class="difficulty"
            @click="start(2)"
          />
          <img
            src="./assets/image/button/btn_normal.png"
            class="difficulty"
            @click="start(4)"
          />
          <img
            src="./assets/image/button/btn_difficult.png"
            class="difficulty"
            @click="start(20)"
          />
        </div>
      </div>

      <div v-show="!frontPage" class="w-full flex flex-col justify-center items-center">
       
       <div class="w-full flex flex-row justify-between">

        <div>
          <!-- ใส่ใจที่นี่ -->
          <ul id="heartContainer" class="flex flex-row">
            <li v-for="(heart,index) in hearts" :key="index" >
              <img v-show="index < hearts" src="./assets/image/elements/heart.png"/>
            </li>
          </ul>
        
          
        </div>
        
        <div>
          <p>Name : {{ name }}</p>
          <p>Score : {{ score }}</p>
        </div>
        </div>
        
        <button @click="faceSpawn">test Spawn</button>
        <ul class="grid-container">
          <li v-for="(face,index) in faceSlots" :key="index" class="grid-item">
            <img v-if="face !== 0" :src="`/src/assets/image/face/face_${face}.png`" @click="faceHit(index)" class="face"/>
          </li>
        </ul>
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
  background: red;
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

#heartContainer {
  width: 33%;
  height: 20%;
  min-width: 350px;
  min-height: 140px;
  background: url(./assets/image/wood/wood_1.png);
  background-repeat: no-repeat;
  background-size: 100%;
}

#heart {
  width: 10%;
  height: 10%;
  min-width: 30px;
  min-height: 30px;

 
}

.difficulty {
  width: 15%;
  transition: 0.5s ease;
  opacity: 1;
  backface-visibility: hidden;
}

.difficulty:hover {
  cursor: pointer;
  opacity: 0.4;
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
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-size: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.face {
  width: 10vw;

}
</style>
