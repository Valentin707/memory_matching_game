<template>
  <div class="timer-wrapper">
    <span>Time:</span>
    <span>{{ timeString }}</span>
  </div>
</template>
<script>
import { useGameStore } from '@/stores/game.js'
export default {
  name: 'Timer',
  data() {
    return {
      time: 0,
      timer: null,
    }
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.time++
        useGameStore().updateTime(this.formattedTime())
      }, 1000)
    },
    formattedTime() {
      const minutes = String(Math.floor(this.time / 60)).padStart(2, '0')
      const seconds = String(this.time % 60).padStart(2, '0')
      return `${minutes}:${seconds}`
    },
    resetTimer() {
      clearInterval(this.timer)
      this.time = 0
      this.timeString = '00:00'
      useGameStore().updateTime('00:00')
    },
    stopTimer() {
      clearInterval(this.timer)
    },
  },
  computed: {
    timeString() {
      return useGameStore().getTime
    },
  },
  mounted() {
    this.emitter.on('resetTimer', () => {
      this.resetTimer()
    })

    this.emitter.on('startTimer', () => {
      this.startTimer()
    })

    this.emitter.on('stopTimer', () => {
      this.stopTimer()
    })
  },
  beforeUnmount() {
    this.emitter.off('resetTimer')
    this.emitter.off('startTimer')
    this.emitter.off('stopTimer')

    this.resetTimer()
  },
}
</script>
