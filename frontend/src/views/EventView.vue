<template lang="pug">
div
    iframe(:src="'https://open.spotify.com/embed/artist/' + eventData.bodyParsed.artists.items[0].id + '?utm_source=generator&theme=2'")
    event-player(:event='eventData.event' v-if='eventData.event')
</template>

<script>
import axios from 'axios'
import EventPlayer from "@/components/eventPlayer.vue";

export default {
    name: "EventView",
    components: {
        'event-player': EventPlayer,
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