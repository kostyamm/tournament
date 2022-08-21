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
    <div class="tournament">
        <div class="tournament__title">
            <h1>Round {{ activeRound }}</h1>

            <button @click="startTournament()">Restart pairs</button>
        </div>

        <h2 v-if="winner">{{ winner.name }} is champion</h2>

        <div v-for="(pair, roundIndex) of currentRound" :key="roundIndex" class="tournament__pair">
            <div
                @click="recordWinner(pair, pair[0])"
                :class="[{ 'tournament__pair__item--winner': pair[0].winner }, 'tournament__pair__item']"
            >
                {{pair[0].name}}
            </div>
            <span>VS</span>
            <div
                @click="recordWinner(pair, pair[1])"
                :class="[{ 'tournament__pair__item--winner': pair[1].winner }, 'tournament__pair__item']"
            >
                {{pair[1].name}}
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
    max-width: $max-width--half;
    margin: 0 auto;

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
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        font-size: 18px;

        & span {
            font-weight: 900;
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
                margin-right: 16px;
            }

            &:last-child {
                margin-left: 16px;
            }

            &--winner {
                border-color: $color--yellow--dark;
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
                    color: $color--blue--dark;
                }
            }
        }
    }

    @media (prefers-color-scheme: light) {
        &__pair__item {
            border-color: $color--grey--light;

            &--winner {
                border-color: $color--dark;
            }
        }

        &__footer__pagination__item--active {
            background-color: $color--blue--dark;
            color: $color--white;
        }
    }
}
</style>