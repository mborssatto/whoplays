<template>
  <div class="eventCard">
      <b-card
         :title="event.name"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        style="max-width: 20rem;"
        class="mb-2"
      >
      <b-card-text>
        <h5>{{ event.artist }}</h5>
        <p>{{ event.date }}</p>
        <p>{{ event.city }}</p>
        <p>{{ event.venue }}</p>
      </b-card-text>

      <b-button href="#" variant="primary">Favorite</b-button>
    </b-card>
  </div>
</template>
 
<script>
import axios from 'axios'

export default {
  name: 'EventCard',
  props: ['event']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
