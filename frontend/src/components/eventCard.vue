<template lang="pug">
b-card.mb-3(img-src='https://picsum.photos/600/50/' img-alt='Image' img-top='')
  b-card-title {{ event.name }}
  b-card-text
    h4 {{ event.artists.join(", ") }}
    p.date {{ new Intl.DateTimeFormat('de-DE').format(new Date(event.date)) }}
    p.place {{ event.city }}
    p.place {{ event.venue }}
    iframe(v-if="detailsExpanded && eventData" v-for='id in eventData?.artistIDs', :src="'https://open.spotify.com/embed/artist/' + id + '?utm_source=generator&theme=0'" style="border-radius:12px" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy")
  b-button(v-if="event", @click="toggleDetails", variant='primary') See details 
</template>

<script>
import axios from 'axios'

export default {
  name: 'EventCard',
  props: ['event'],

  data() {
    return {
      detailsExpanded: false,
      eventData: undefined,
    }
  },

  methods: {
    async toggleDetails() {
      this.detailsExpanded = !this.detailsExpanded
      if (!this.detailsExpanded) return
      const eventsRequest = await axios.get(`/events/${this.event._id}`)
      this.eventData = eventsRequest.data
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-body {
  text-align: left;
  // line-height: 0.8rem;
  // justify-content: space-between;
  // display: flex;
  // flex-direction: column;
}

.card-title {
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;
  color: grey;
  line-height: 0.6rem;
}

.date{
  margin-bottom: 1.5rem;
  margin-top: -0.3rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.place {
  font-size: 0.9rem;
  line-height: 0.4rem;
}

.btn {
  align-self: center;
  
  // --bs-btn-bg: $blue: #213950 !default;;
  // --bs-btn-border: 0rem;
}
</style>
