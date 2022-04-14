<script setup>
defineEmits(['settingToggle'])
</script>
 
<template>
  <div class="settingsContainer flex flex-row">
    <img src="../assets/image/button/setting.png" class="settings" @click="$emit('settingToggle', null)" />
  </div>
</template>
 
<style scoped>
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
  cursor: url(../assets/image/click/click2.png) 44 50, auto;
  opacity: 0.6;
}
img {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>