<template>
  <div class="eventList">
    <h1>{{ event.name }} @{{ event.city }}</h1>
    <h2>{{ event.date }}</h2>
    <p>{{ event.artist }}</p>
    <p>{{ event.venue }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Event',
  props: ['event']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
