<template>
  <div class="home">
    <h1>Welcome to whoPlays</h1>
    <h2>Check out these events!</h2>
    <b-container>
      <b-row align-v="stretch">
        <b-col md="4" v-for="event in events" class="card-row">
          <event-card
           :event="event" :key="event._id" /></event-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
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