import { shouldPairs } from '../../helpers/index.js'
import shuffle from 'lodash-es/shuffle.js'
import flatten from 'lodash-es/flatten.js'
import uniqBy from 'lodash-es/uniqBy.js'

const initialState = () => ({
    rounds: {},
    activeRound: 0,
    pagination: [],
    winner: null,
})

const state = initialState()

const getters = {
    pagination: (state) => state.pagination,
    activeRound: (state) => state.activeRound,
    winner: (state) => state.winner,

    currentRound: (state) => state.rounds[state.activeRound],
    roundWinners: (state, getters) => flatten(getters.currentRound).filter(({ winner }) => winner),
    preparedWinners: (state, getters) => uniqBy(getters.roundWinners, 'id').map(item => ({ ...item, winner: false })),

    necessaryWinners: (state, getters) => getters.currentRound?.length,
    winnersCount: (state, getters) => getters.roundWinners?.length,
    isLastRound: (state, getters) => [getters.winnersCount, getters.necessaryWinners].every(i => i === 1),

    isCompleted: (state, getters) => !getters.winner && getters.necessaryWinners === getters.winnersCount,
}

const actions = {
    startTournament: ({ rootState, commit }) => {
        const users = rootState.users.users

        if (users.length <= 1) {
            return console.error('A minimum of 2 players is required to start the tournament')
        }

        commit('resetState')

        const mixedUsers = shuffle(users)

        commit('nextRound', shouldPairs(mixedUsers))
    },
    createRound: ({ commit, getters }) => {
        commit('nextRound', shouldPairs(getters.preparedWinners))
    },
    recordWinner: ({ commit, getters }, data) => {
        commit('setUserWinner', data)

        if (!getters.winnersCount) {
            return
        }

        const { gamer } = data

        if (getters.isLastRound) {
            return commit('setWinner', gamer)
        }

        if (getters.necessaryWinners === 2) {
            const [first, second] = getters.roundWinners

            if (first?.id === second?.id) {
                commit('setWinner', first)
            }
        }
    },
}

const mutations = {
    resetState: (state) => Object.assign(state, initialState()),
    setActiveRound: (state, round) => state.activeRound = round,
    setWinner: (state, winner) => state.winner = winner,
    setUserWinner: (state, data) => {
        const { pair, gamer } = data

        state.winner = null

        const opponent = pair.find(opponent => opponent.id !== gamer.id)

        opponent.winner = false
        gamer.winner = true
    },
    nextRound: (state, usersPairs) => {
        const nextRound = ++state.activeRound

        state.rounds[nextRound] = usersPairs

        if (state.pagination.every(roundNum => roundNum !== nextRound)) {
            state.pagination.push(nextRound)
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}