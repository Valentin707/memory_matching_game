<template>
 <div class="board-header-wrapper row">
   <div class="board-header">
     <div class="actions-wrapper">
       <router-link to="/" tag="button" class="btn small with-icon">
         <img class="button-icon" src="../assets/images/icons/home.svg" alt="Go to home">
       </router-link>
       <button class="btn small with-icon" @click="handleResetClick">
         <img class="button-icon" src="../assets/images/icons/reset.svg" alt="Reset the Game">
       </button>
     </div>
     <timer></timer>
     <div class="score-wrapper">
       <span>{{ moves }}</span>
     </div>
   </div>
 </div>
</template>
<script>
import { useGameStore } from '@/stores/game.js'
import Timer from '@/components/Timer.vue'
export default {
  name: 'BoardHeaderView',
  components: {
    Timer,
  },
  methods: {
    handleResetClick() {
      this.$emit('reset')
    },
  },
  computed: {
    moves() {
      return useGameStore().getMoves
    },
  },
}
</script>
