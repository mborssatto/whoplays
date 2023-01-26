<template lang="pug">
div.card-row
    event-player(:event='eventData' v-if='eventData')
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

<style>
.card-row {
    display: flex;
    align-items: stretch;
    justify-content: center;
}
</style>