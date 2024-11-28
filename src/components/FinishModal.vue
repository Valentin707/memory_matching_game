<template>
    <div class="modal">
      <h2>Congratulations!</h2>
      <p>You have completed the game in <strong>{{ time }}</strong> with <strong>{{ moves }}</strong> moves.</p>
      <button @click="playAgain" class="btn small success">Play Again</button>
    </div>
</template>
<script>
  import { useGameStore } from '@/stores/game.js'

  export default {
    name: 'FinishModal',

    methods: {
      playAgain() {
        this.$router.push({ name: 'home' })
        this.$emit('close-modal')
      }
    },
    computed: {
      time() {
        return useGameStore().getTime
      },
      moves() {
        return useGameStore().getMoves
      }
    }
  }
</script>
