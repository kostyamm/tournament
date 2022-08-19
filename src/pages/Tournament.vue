<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "Tournament",
    setup() {
        const store = useStore()

        const changeActiveRound = (round) => store.commit('tournament/setActiveRound', round)

        const recordWinner = (pair, gamer) => store.dispatch('tournament/recordWinner', { pair, gamer })

        const startTournament = () => store.dispatch('tournament/startTournament')

        const createRound = () => store.dispatch('tournament/createRound')

        const pagination = computed(() => store.getters['tournament/pagination'])
        const activeRound = computed(() => store.getters['tournament/activeRound'])
        const winner = computed(() => store.getters['tournament/winner'])

        const currentRound = computed(() => store.getters['tournament/currentRound'])
        const isCompleted = computed(() => store.getters['tournament/isCompleted'])

        onMounted(() => startTournament())

        return {
            activeRound, winner, pagination, recordWinner, createRound, isCompleted, startTournament, currentRound, changeActiveRound
        }
    },
}
</script>

<template>
    <div>
        <button @click="startTournament()">Start</button>
    </div>

    <div v-if="winner">
        <h2>winner {{ winner.name }}</h2>
    </div>

    <h2>round {{ activeRound }}</h2>
    <div v-for="(pair, roundIndex) of currentRound" :key="roundIndex" class="pair">
        <div v-for="gamer of pair" :key="gamer.id" @click="recordWinner(pair, gamer)">
            {{ gamer.name }} {{ gamer.winner && gamer.winner.toString() }}
        </div>
    </div>


    <button @click="createRound" :disabled="!isCompleted">next</button>
    <div v-for="round in pagination" :key="round" @click="changeActiveRound(round)">
        {{ round }}
    </div>
</template>

<style scoped>
.pair {
    display: flex;
    justify-content: center;
}

.pair *:first-child:after {
    content: 'VS';
    padding: 0 12px;
}
</style>