<template>
  <div class="cover" v-if="showModal">
    <finish-modal @closeModal="closeModal"></finish-modal>
  </div>

  <div class="container">
    <RouterView v-if="!is_loading" />
  </div>
</template>

<script>
import { useSettingsStore } from '@/stores/settings'
import { useScoresStore } from '@/stores/scores'
import FinishModal from '@/components/FinishModal.vue'

export default {
  name: 'App',
  components: { FinishModal },
  data() {
    return {
      is_loading: true,
      showModal: false,
    }
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
  },
  async mounted() {
    // set stores
    const settingsStore = useSettingsStore()
    const scoresStore = useScoresStore()
    await Promise.all([settingsStore.syncSettings(), scoresStore.syncScores()])
    // ready to go
    this.is_loading = false

    // listen for game finish
    this.emitter.on('gameFinish', () => {
      this.showModal = true
    })
  },
}
</script>

<style lang="scss">
  @import '@/assets/styles/app.scss';
</style>
