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
            activeRound,
            winner,
            pagination,
            recordWinner,
            createRound,
            isCompleted,
            startTournament,
            currentRound,
            changeActiveRound,
        }
    },
}
</script>

<template>
    <div class="tournament container--half">
        <div class="tournament__title">
            <h1>Round {{ activeRound }}</h1>

            <button @click="startTournament()">Mix pairs</button>
        </div>

        <h2 v-if="winner">{{ winner.name }} is champion</h2>

        <div
            v-for="([ firstPlayer, secondPlayer ], roundIndex) in currentRound"
            :key="roundIndex"
            class="tournament__pair"
        >
            <template v-if="!secondPlayer">
                <b>{{ firstPlayer.name }}</b> - <small>Will be moved to the next round</small>
            </template>
            <div v-else class="tournament__pair__active">
                <div

                    @click="recordWinner([ firstPlayer, secondPlayer ], firstPlayer)"
                    :class="[{ 'tournament__pair__active__item--winner': firstPlayer.winner }, 'tournament__pair__active__item']"
                >
                    {{ firstPlayer.name }}
                </div>
                <div
                    @click="recordWinner([ firstPlayer, secondPlayer ], secondPlayer)"
                    :class="[{ 'tournament__pair__active__item--winner': secondPlayer.winner }, 'tournament__pair__active__item']"
                >
                    {{ secondPlayer.name }}
                </div>
            </div>
        </div>

        <div class="tournament__footer">
            <div class="tournament__footer__pagination">
                <div
                    v-for="round in pagination"
                    :key="round"
                    :class="[{'tournament__footer__pagination__item--active' : round === activeRound }, 'tournament__footer__pagination__item']"
                    @click="changeActiveRound(round)"
                >
                    {{ round }}
                </div>
            </div>

            <button @click="createRound" :disabled="!isCompleted">Next round</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.tournament {
    &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;

        h1 {
            margin: 0;
        }
    }

    &__pair {
        margin-bottom: 24px;
        font-size: 18px;

        &__active {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:after {
                position: absolute;
                content: 'VS';
                left: calc(50% - 24px);
                top: 0;
                font-weight: 900;
                transform: translate(50%, 50%);
            }

            &__item {
                flex: 1;

                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                cursor: pointer;
                border: 2px solid $color--grey;
                border-radius: $border-radius;
                padding: 8px 12px;

                &:first-child {
                    margin-right: 24px;
                }

                &:last-child {
                    margin-left: 24px;
                }

                &--winner {
                    border-color: $color--yellow;
                }
            }
        }
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__pagination {
            display: flex;
            align-items: center;

            &__item {
                padding: 8px 12px 6px;
                font-size: 16px;
                font-weight: 500;
                font-family: inherit;
                line-height: 22px;

                border-radius: $border-radius;
                border: 2px solid transparent;
                cursor: pointer;

                &:not(:last-child) {
                    margin-right: 8px;
                }

                &--active {
                    background-color: $color--yellow;
                    color: $color--dark;
                }
            }
        }
    }

    @media (prefers-color-scheme: light) {
        &__pair__item {
            border-color: $color--grey;

            &--winner {
                border-color: $color--dark;
            }
        }

        &__footer__pagination__item--active {
            background-color: $color--dark;
            color: $color--white;
        }
    }
}
</style>