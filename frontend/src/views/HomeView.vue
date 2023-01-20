<template>
  <div class="home">
    <h1>Welcome to whoPlays</h1>
    <h2>Check out these events!</h2>
    <ul>
      <Event v-for="event in events" :event="event" :key="event._id" />
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Event from "@/components/event.vue";

export default {
  name: "Home",
  components: {
    Event,
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