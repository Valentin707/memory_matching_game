import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {

  state: () => ({
    card_back_theme: 'blue',
    card_theme: 'nature',
    board_theme: 'green',
  }),

  getters: {
    getCardBackTheme: (state) => state.card_back_theme,
    getCardTheme: (state) => state.card_theme,
    getBoardTheme: (state) => state.board_theme,
  },

  actions: {
    saveSettings(settings) {
      // save in state
      this.card_back_theme = settings.card_back_theme
      this.card_theme = settings.card_theme
      this.board_theme = settings.board_theme

      // save in local storage
      localStorage.setItem('user_settings', JSON.stringify(settings))
    },

    syncSettings() {
      // get from local storage
      const settings = localStorage.getItem('user_settings')

      // save in state
      if (settings) {
        const { card_back_theme, card_theme, board_theme } = JSON.parse(settings)
        this.card_back_theme = card_back_theme
        this.card_theme = card_theme
        this.board_theme = board_theme
      }
    }
  }

});
