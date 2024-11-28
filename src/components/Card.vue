<template>
  <div
    :class="`card ${card.flipped ? 'flipped' : ''} ${canClickCard ? '' : 'disabled'} ${shake ? 'shake' : ''}`"
    @click="handleCardClick"
  >
    <div class="inner">
      <img :src="cardBackTheme" alt="Card Back" />
      <img :src="cardImage" :alt="'Card' + card.id" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    card: Object,
    cardBackTheme: String,
    cardTheme: String,
    isClickable: Boolean,
  },
  data() {
    return {
      shake: false, // when gave finished - party shake
    }
  },
  methods: {
    handleCardClick() {
      if (this.canClickCard) {
        this.card.flipped = true
        this.$emit('card-click', this.card)
      }
    },
  },
  computed: {
    cardImage() {
      return new URL(
        `../assets/images/cards_themes/${this.cardTheme}/${this.card.cardId}.jpg`,
        import.meta.url,
      ).href
    },
    canClickCard() {
      return this.isClickable && !this.card.flipped && !this.card.locked
    },
  },
  mounted() {
    this.emitter.on('flipOff', () => {
      if (!this.card.locked) {
        this.card.flipped = false
      }
    })

    this.emitter.on('lockCards', () => {
      if (this.card.flipped) {
        this.card.locked = true
      }
    })

    this.emitter.on('shakeCards', () => {
      this.shake = true;
    })
  },
  beforeUnmount() {
    this.emitter.off('flipOff')
    this.emitter.off('lockCards')
    this.emitter.off('shakeCards')
  },
}
</script>
