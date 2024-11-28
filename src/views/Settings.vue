<template>
  <section class="main-form">
    <div class="row">
      <div class="main-form-wrapper box">
        <h1 class="main-form-title">Customise your game!</h1>
        <div class="form-group">
          <label for="card_back">Select Card Back Theme:</label>
          <select id="card_back" name="card_back" v-model="card_back">
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
          </select>
        </div>

        <div class="form-group">
          <label for="card_theme">Select Card Theme:</label>
          <select id="card_theme" name="card_theme" v-model="card_theme">
            <option value="cars">Cars</option>
            <option value="nature">Nature</option>
            <option value="animals">Animals</option>
          </select>
        </div>

        <div class="form-group">
          <label for="board_theme">Select Board Theme:</label>
          <select id="board_theme" name="board_theme" v-model="board_theme">
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
          </select>
        </div>

        <button class="btn small success" @click="handleSettingsSave">Save</button>
        <router-link to="/home" class="btn small">Home</router-link>
      </div>
    </div>
  </section>
</template>
<script>
import { useSettingsStore } from '@/stores/settings'

export default {
  name: 'SettingsView',
  data() {
    return {
      card_back: 'green',
      card_theme: 'standard',
      board_theme: 'green',
    }
  },
  methods: {
    handleSettingsSave() {
      useSettingsStore().saveSettings({
        card_back_theme: this.card_back,
        card_theme: this.card_theme,
        board_theme: this.board_theme,
      })

      this.$router.push('/home')
    },
    syncSettings() {
      this.card_back = useSettingsStore().getCardBackTheme
      this.card_theme = useSettingsStore().getCardTheme
      this.board_theme = useSettingsStore().getBoardTheme
    }
  },
  mounted() {
    this.syncSettings()
  },
}
</script>
