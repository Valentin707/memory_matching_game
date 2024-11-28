<template>
 <div class="board-grid-wrapper">
   <div :class="'board-grid ' + selectedLevel.class">
     <card
       v-for="(card, index) in cards"
       :key="index"
       :card="card"
       :cardBackTheme="cardBackTheme"
       :cardTheme="cardTheme"
       :isClickable="isClickable"
       @cardClick="handleCardClick"
     ></card>
   </div>
 </div>
</template>
<script>
import Card from '@/components/Card.vue'
import { useGameStore } from '@/stores/game.js'
import { useScoresStore} from '@/stores/scores.js'

export default {
  name: 'BoardView',
  components: { Card },
  props: {
    selectedLevel: Object,
    cards: Array,
    cardBackTheme: String,
    cardTheme: String,
  },
  data() {
    return {
      cardsFlipped: [],
      isClickable: true,
    }
  },
  methods: {
    handleCardClick(card) {
      if (this.cardsFlipped.length === 0) {
        this.cardsFlipped.push(card)
      } else {
        this.cardsFlipped.push(card)
        this.checkMatches()
      }
    },
    checkMatches() {
      this.isClickable = false
      if (this.cardsFlipped[0].cardId === this.cardsFlipped[1].cardId) {
        this.emitter.emit("lockCards")
        this.clearFlippedCards()
        this.incrementMoves()
        this.checkGameOver()
      } else {
        // flip cards back after a second
        setTimeout(() => {
          this.emitter.emit("flipOff")
          this.clearFlippedCards()
          this.incrementMoves()
          this.isClickable = true
        }, 1000)
      }
    },
    incrementMoves() {
      useGameStore().incrementMoves()
    },
    clearFlippedCards() {
      this.cardsFlipped = []
    },
    checkGameOver() {
      if (this.cards.every(card => card.locked)) {
        this.emitter.emit('shakeCards')
        this.emitter.emit('stopTimer')
        this.emitter.emit('gameFinish')
        this.saveScore()
      } else {
        this.isClickable = true
      }
    },
    saveScore() {
      const time = useGameStore().getTime
      const moves = useGameStore().getMoves
      const score = {
        time,
        moves,
        level: this.selectedLevel.value,
      }

      useScoresStore().addGameScore(score)
    }
  }
}
</script>
