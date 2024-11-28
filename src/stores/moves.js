import { defineStore } from 'pinia'

export const useMovesStore = defineStore('moves', {
  state: () => ({
    moves: 0,
  }),

  getters: {
    getMoves: (state) => state.moves,
  },

  actions: {
    incrementMoves() {
      this.moves++
    },

    resetMoves() {
      this.moves = 0
    },
  }
})
