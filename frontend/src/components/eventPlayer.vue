<template lang="pug">
//- p {{ event.bodyParsed.artists.items[0].id }}
b-card.mb-2(:title='event.name' style='max-width: 20rem;')
  b-card-text
    h5 {{ event.artists.join(", ") }}
    p {{ new Intl.DateTimeFormat('de-DE').format(new Date(event.date)) }}
    p {{ event.city }}
    p {{ event.venue }}
  b-button(v-if="event", href="", variant='primary') Create Playlist
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
