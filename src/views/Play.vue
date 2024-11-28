<template>
  <section class="board">
    <!-- Board Header -->
    <board-header @reset="resetGame"></board-header>

    <div class="board-container row">
      <!-- Board Grid -->
      <board
        :selectedLevel="selectedLevel"
        :cards="cards"
        :cardBackTheme="cardBackTheme"
        :cardTheme="cardTheme"
      ></board>
    </div>
  </section>
</template>
<script>
import BoardHeader from '@/components/BoardHeader.vue'
import Board from '@/components/Board.vue'
import { useSettingsStore } from '@/stores/settings'
import { useGameStore } from '@/stores/game.js'
import levelsMap from '@/config/levels.json'
import FinishModal from '@/components/FinishModal.vue'

export default {
  name: 'PlayView',
  components: {
    BoardHeader,
    Board,
    FinishModal,
  },
  data() {
    return {
      cardBackTheme: '',
      cardTheme: '',
      selectedLevel: {},
      levelsMap: levelsMap,
      cards: [],
    }
  },
  methods: {
    setupGame() {
      this.setUpBoardTheme()
      this.setUpCardThemes()
      this.setUpPlayCards()
      // start game
      this.emitter.emit('startTimer')
    },
    setUpBoardTheme() {
      let boardImageUrl = new URL(
        `../assets/images/board_themes/${useSettingsStore().getBoardTheme}.jpg`,
        import.meta.url,
      ).href
      document.body.style.backgroundImage = `url(${boardImageUrl})`
    },
    setUpCardThemes() {
      this.cardTheme = useSettingsStore().getCardTheme
      this.cardBackTheme = new URL(
        `../assets/images/card_back_themes/card_${useSettingsStore().getCardBackTheme}.png`,
        import.meta.url,
      ).href
    },

    setUpPlayCards() {
      // set selected level
      let level = localStorage.getItem('selected_level')
      this.selectedLevel = this.levelsMap.find((l) => l.value === level)

      // generate play cards
      for (let i = 0; i < this.selectedLevel.cards; i++) {
        this.cards.push({
          id: i,
          cardId: Math.floor(i / 2) + 1, // make sure there are 2 cards with the same cardId (pair)
          flipped: false,
          locked: false,
        })
      }

      this.cards = this.shuffleCards(this.cards)
    },
    shuffleCards(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        // Generate random index
        let randomIndex = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
      }

      return arr
    },

    resetGame() {
      this.cards = []
      this.emitter.emit('resetTimer')
      useGameStore().resetMoves()
      this.setupGame()
    },
  },
  mounted() {
    this.setupGame()
  },
  beforeUnmount() {
    // reset background image
    document.body.style.backgroundImage = ''
    // reset moves
    useGameStore().resetMoves()
  },
}
</script>
