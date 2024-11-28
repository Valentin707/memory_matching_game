<template>
  <section class="score-table">
    <div class="row">
      <div class="score-table-wrapper">
        <div class="score-table-header">
          <router-link to="/home" class="btn with-icon small absolute">
            <img class="button-icon" src="../assets/images/icons/home.svg" alt="Go to home">
          </router-link>
          <h1 class="score-table-title">Scoreboard</h1>
        </div>
        <div class="buttons-container">
          <div class="form-group">
            <select name="board_theme" v-model="filterLevel" @change="filterScoresByLevel">
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div class="form-group">
            <select name="board_theme" v-model="sortBy" @change="sortScores">
              <option value="best-time">Best Time</option>
              <option value="least-moves">Least Moves</option>
            </select>
          </div>
        </div>
        <table class="table">
          <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Level</th>
            <th scope="col">Time</th>
            <th scope="col">Moves</th>
          </tr>
          </thead>
          <tbody v-if="filteredScores.length > 0">
            <tr
              :class="getClassForTopPlaces(index)"
              v-for="(game, index) in filteredScores"
              :key="index"
            >
              <th scope="row">{{ index + 1}}</th>
              <td>{{ game.level.toUpperCase() }}</td>
              <td>{{ game.time }}</td>
              <td>{{ game.moves }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <th scope="row" colspan="4" class="empty">No scores found</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </section>
</template>
<script>
  import { useScoresStore } from '@/stores/scores.js'
  export default {
    name: 'ScoreView',
    data() {
      return {
        sortBy: 'least-moves',
        filterLevel: 'all',
        scoresArr: [],
        filteredScores: []
      }
    },
    methods: {
      getClassForTopPlaces(index) {
        switch (index) {
          case 0:
            return 'first'
          case 1:
            return 'second'
          case 2:
            return 'third'
          default:
            return ''
        }
      },
      fetchScores() {
        this.scoresArr = useScoresStore().getScores
        this.filterScoresByLevel()
        this.sortScores()
      },
      filterScoresByLevel() {
        this.filteredScores = this.scoresArr.filter(score => {
          switch (this.filterLevel) {
            case 'easy':
              return score.level === "easy"
            case 'medium':
              return score.level === "medium"
            case 'hard':
              return score.level === "hard"
            default:
              return true
          }
        })
      },
      sortScores() {
        switch (this.sortBy) {
          case 'best-time':
            this.filteredScores = this.filteredScores.sort((a, b) => {
              const aTime = a.time.split(':')
              const bTime = b.time.split(':')
              if (aTime[0] === bTime[0]) {
                if (aTime[1] === bTime[1]) {
                  return aTime[2] - bTime[2]
                }
                return aTime[1] - bTime[1]
              }
              return aTime[0] - bTime[0]
            })
            break
          case 'least-moves':
            this.filteredScores = this.filteredScores.sort((a, b) => a.moves - b.moves)
            break
          default:
            break
        }
      }
    },
    mounted() {
      // fetch scores
      this.fetchScores()
    }
  }
</script>
<style lang="scss" scoped>
  .empty {
    padding: 0.5rem 1rem;
    text-align: center;
    font-style: italic;
    font-size: 1.5rem;
    line-height: 2rem;
    color: #FFFFFF;
  }
</style>
