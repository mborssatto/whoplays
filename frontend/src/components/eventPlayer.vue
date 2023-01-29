<template lang="pug">
b-card.mb-2(:title='eventData.event.name' style='max-width: 20rem;')
  b-card-text
    h5 {{ eventData.event.artists.join(", ") }}
    p {{ new Intl.DateTimeFormat('de-DE').format(new Date(eventData.event.date)) }}
    p {{ eventData.event.city }}
    p {{ eventData.event.venue }}
    iframe(v-for='id in eventData.artistIDs', :key='id', :src="'https://open.spotify.com/embed/artist/' + id + '?utm_source=generator&theme=2'")
  b-button(v-if="eventData.event", href="", variant='primary') Create Playlist
</template>

<script>
import axios from 'axios'

export default {
  name: 'EventPlayer',
  props: ['eventData'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-body {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.btn {
  align-self: center;
}
</style>
