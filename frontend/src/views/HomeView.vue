<template lang="pug">
.home
  div.title
    h1 Welcome to whoPlays
    h2 Find events in your city and get to know the lineup.
  div.filters
    b-container
      b-form-select.select-box(v-model="selectedCity" @change="filterEvents")
        option(value="") Select your city
        option(v-for="city in allCities" :value="city") {{ city }}
      //- b-form-datepicker(v-model="selectedDate"  style='margin: auto')
  b-container
    b-row
      b-col.card-row(md='6' v-for='event in events')
        event-card(:event='event' :key='event._id')
</template>

<script>
import axios from 'axios'
import EventCard from '@/components/eventCard.vue'

export default {
  name: 'Home',
  components: {
    'event-card': EventCard,
  },
  data() {
    return {
      events: [],
      selectedCity: '',
      allCities: [],
      // selectedDate: ''
    }
  },
  async created() {
    const eventsRequest = await axios.get('/events')
    this.events = eventsRequest.data
    this.allCities = [...new Set(this.events.map(event => event.city))] // Extract unique city names from the events array
  },
  methods: {
    async filterEvents() {
      const eventsRequest = await axios.get(`/events?city=${this.selectedCity}`)
      // const eventsRequest = await axios.get(`/events?city=${this.selectedCity}&date=${this.selectedDate}`)
      this.events = eventsRequest.data
    },
  },
}
</script>

<style>
.title {
  padding-top: 10rem;
}

.card-row {
  /* display: flex;
  align-items: stretch;
  justify-content: center; */
  min-width: 300px;
}

.filters {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 10rem;
}

.select-box {
  border-color: var(--bs-border-color-translucent);
  border-width: 1px;
  border-color: var(--bs-border-color-translucent);
  border-radius: 0.375rem;
  height: 2.5rem;
  width: min-content;
  padding: inherit;
}
</style>
