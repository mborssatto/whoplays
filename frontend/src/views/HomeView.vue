<template lang="pug">
.home
  h1 Welcome to whoPlays
  h2 Check out these events!
  b-container
    b-row(align-v='stretch')
      b-col.card-row(md='4' v-for='event in events')
        event-card(:event='event' :key='event._id')
</template>

<script>
import axios from 'axios'
import EventCard from "@/components/eventCard.vue";

export default {
  name: "Home",
  components: {
    'event-card' : EventCard,
  },
  data() {
    return {
      events: []
    }
  },
  async created() {
    const eventsRequest = await axios.get('/events')
    this.events = eventsRequest.data
  }
};
</script>

<style>
.card-row {
  display: flex;
  align-items: stretch;
  justify-content: center;
}
</style>