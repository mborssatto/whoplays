<template lang="pug">
div
    iframe(:src="'https://open.spotify.com/embed/artist/' + eventData.bodyParsed.artists.items[0].id + '?utm_source=generator&theme=2'")
    //- iframe(style='border-radius:12px' :src="'https://open.spotify.com/embed/artist/' + eventData.bodyParsed.artists.items[0].id + '?utm_source=generator&theme=0'" width='100%' height='152' frameborder='0' allowfullscreen='' clipboard-write; encrypted-media;picture-in-picture' loading='lazy')
    event-card(:event='eventData.event' v-if='eventData.event')
</template>

<script>
import axios from 'axios'
import EventCard from "@/components/eventCard.vue";

export default {
    name: "EventView",
    components: {
        'event-card': EventCard,
    },
    data() {
        return {
            eventData: {}
        }
    },
    async created() {
        const eventsRequest = await axios.get(`/events/${this.$route.params.id}`)
        this.eventData = eventsRequest.data
    }
};
</script>