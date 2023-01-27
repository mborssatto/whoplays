<template lang="pug">
.home
  h1 Welcome to whoPlays
  h2 Find events in your city and get to know the lineup.
  b-container
    b-form-select(v-model="selectedCity" @change="filterEvents")
      option(value="") Select your city
      option(v-for="city in allCities" :value="city") {{ city }}
    //- b-form-datepicker(v-model="selectedDate"  style='margin: auto')
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
    'event-card': EventCard,
  },
  data() {
    return {
      events: [],
      selectedCity: '',
      allCities: []
      // selectedDate: ''
    }
  },
  async created() {
    const eventsRequest = await axios.get('/events')
    this.events = eventsRequest.data
    this.allCities = [...new Set(this.events.map(event => event.city))]// Extract unique city names from the events array
  },
  methods: {
    async filterEvents() {
      const eventsRequest = await axios.get(`/events?city=${this.selectedCity}`)
      // const eventsRequest = await axios.get(`/events?city=${this.selectedCity}&date=${this.selectedDate}`)
      this.events = eventsRequest.data
    }
  },
}
</script>

<style>
.card-row {
  display: flex;
  align-items: stretch;
  justify-content: center;
}
</style>