<script setup>
defineProps({
  players: {
    type: Array
  }
})
</script>
 
<template>
        <div>
            <ul>
                <li v-for="(players, index) in players" :key="index">
                Name: {{players.name}}
                Score: {{players.score}}</li>
            </ul>
        </div>
</template>
 
<style>

</style>