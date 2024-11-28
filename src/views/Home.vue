<template>
  <section class="main-form">
    <div class="row">
      <div class="main-form-wrapper box">
        <h1 class="main-form-title">Welcome to <br />Memory Matching Game!</h1>
        <div class="form-group">
          <label for="level">Select Level:</label>
          <select id="level" name="level" v-model="level" @change="handleLevelSelect">
            <option value="easy">Easy (4x4)</option>
            <option value="medium">Medium (6x6)</option>
            <option value="hard">Hard (8x8)</option>
          </select>
        </div>

        <div class="buttons-container">
          <router-link to="/score" class="btn small fullwidth">Scoreboard</router-link>
          <router-link to="/settings" class="btn with-icon small">
            <img class="button-icon" src="../assets/images/icons/settings.svg" alt="Go to Settings">
          </router-link>
        </div>
        <router-link to="/play" class="btn small success">Start Game</router-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'HomeView',
  data() {
    return {
      level: 'easy',
    }
  },
  methods: {
    handleLevelSelect() {
      localStorage.setItem('selected_level', this.level)
    },
  },
  mounted() {
    let selectedLevel = localStorage.getItem('selected_level')
    if (selectedLevel) {
      this.level = selectedLevel
    } else {
      // if first time, set default level in local storage
      localStorage.setItem('selected_level', this.level)
    }
  },
}
</script>
