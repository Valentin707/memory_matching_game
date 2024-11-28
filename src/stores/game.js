import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    moves: 0,
    time: '00:00',
  }),

  getters: {
    getMoves: (state) => state.moves,
    getTime: (state) => state.time,
  },

  actions: {
    incrementMoves() {
      this.moves++
    },

    resetMoves() {
      this.moves = 0
    },

    updateTime(time) {
      this.time = time
    }
  }
})
