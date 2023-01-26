<template lang="pug">
//- p {{ event.bodyParsed.artists.items[0].id }}
b-card.mb-2(:title='event.event.name' style='max-width: 20rem;')
  b-card-text
    h5 {{ event.event.artists.join(", ") }}
    p {{ new Intl.DateTimeFormat('de-DE').format(new Date(event.event.date)) }}
    p {{ event.event.city }}
    p {{ event.event.venue }}
    iframe(:src="'https://open.spotify.com/embed/artist/' + event.bodyParsed.artists.items[0].id + '?utm_source=generator&theme=2'")
  b-button(v-if="event.event", href="", variant='primary') Create Playlist
</template>

<script>
import axios from 'axios'

export default {
  name: 'EventPlayer',
  props: ['event']
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
  align-self: center
}
</style>
