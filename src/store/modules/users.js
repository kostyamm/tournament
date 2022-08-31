import { initialUser } from '../../helpers/index.js'
import isEqual from 'lodash-es/isEqual.js'

const initialState = () => ({
    users: []
})

const state = initialState()

const getters = {
    users: state => state.users,
}

const actions = {
    saveState: ({ state }) => {
        const savedState = localStorage.getItem('users')
        const isRestored = isEqual(state, savedState)
        const isInitialState = isEqual(state, initialState())

        if (isInitialState) return localStorage.removeItem('users')

        if (isRestored) return

        localStorage.setItem('users', JSON.stringify(state))
    },
    restoreState: ({ commit }) => {
        const savedState = JSON.parse(localStorage.getItem('users'))

        commit('resetState', savedState)
    }
}

const mutations = {
    resetState: (state, data = initialState()) => Object.assign(state, data),
    addUser: (state, userName) => state.users.push(initialUser(userName, state.users)),
    removeUser: (state, userId) => state.users = state.users.filter(user => user.id !== userId),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}