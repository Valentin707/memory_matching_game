import { defineStore } from 'pinia'

export const useScoresStore = defineStore('scores', {

  state: () => ({
    scores: [],
  }),

  getters: {
    getScores: (state) => state.scores,
  },

  actions: {
    syncScores() {
      // get from local storage
      const scores = localStorage.getItem('user_scores')

      // save in state
      if (scores) {
        this.scores = JSON.parse(scores)
      }
    },

    addGameScore(score) {
      // add score to state
      this.scores.push(score)

      // save to local storage
      localStorage.setItem('user_scores', JSON.stringify(this.scores))
    },
  }
});
