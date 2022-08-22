import { isEven } from '../../helpers/index.js'
import shuffle from 'lodash-es/shuffle.js'
import flatten from 'lodash-es/flatten.js'
import uniqBy from 'lodash-es/uniqBy.js'
import chunk from 'lodash-es/chunk.js'

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
    roundWinners: (state, { currentRound }) => {
        const normalizedRound = flatten(currentRound)
        const length = normalizedRound.length
        const lastIndex = length - 1

        return normalizedRound.filter(({ winner }, index) => winner || (!isEven(length) && index === lastIndex))
    },
    preparedWinners: (state, { roundWinners }) => uniqBy(roundWinners, 'id').map(item => ({ ...item, winner: false })),

    necessaryWinners: (state, { currentRound }) => currentRound?.length,
    winnersCount: (state, { roundWinners }) => roundWinners?.length,
    isLastRound: (state, { winnersCount, necessaryWinners }) => [winnersCount, necessaryWinners].every(i => i === 1),

    isCompleted: (state, { winner, necessaryWinners, winnersCount }) => !winner && necessaryWinners === winnersCount,
}

const actions = {
    startTournament: ({ rootState, commit }) => {
        const users = rootState.users.users

        if (users.length <= 1) {
            return console.error('A minimum of 2 players is required to start the tournament')
        }

        commit('resetState')

        const mixedUsers = shuffle(users)

        commit('nextRound', mixedUsers)
    },
    createRound: ({ commit, getters }) => {
        commit('nextRound', getters.preparedWinners)
    },
    recordWinner: ({ commit, getters }, data) => {
        commit('setUserWinner', data)

        if (!getters.winnersCount) {
            return
        }

        if (getters.isLastRound) {
            return commit('setWinner', data.gamer)
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
    setUserWinner: (state, { pair, gamer }) => {
        state.winner = null

        const opponent = pair.find(opponent => opponent.id !== gamer.id)

        opponent.winner = false
        gamer.winner = true
    },
    nextRound: (state, users) => {
        const nextRound = ++state.activeRound
        const roundIndex = nextRound-1

        state.rounds[nextRound] = chunk(users, 2)

        state.pagination = state.pagination.splice(0, roundIndex)

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