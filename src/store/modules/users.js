import { initialUser } from '../../helpers/index.js'
import isEqual from 'lodash-es/isEqual.js'

const getStorageItem = () => JSON.parse(localStorage.getItem('users'))
const setStorageItem = (state) => localStorage.setItem('users', JSON.stringify(state))
const removeStorageItem = () => localStorage.removeItem('users')

const initialState = () => ({
    users: []
})

const state = initialState()

const getters = {
    users: state => state.users,
}

const actions = {
    saveState: ({ state }) => {
        const isRestored = isEqual(state, getStorageItem())
        const isInitialState = isEqual(state, initialState())

        if (isInitialState) return removeStorageItem()
        if (isRestored) return

        setStorageItem(state)
    },
    restoreState: ({ commit }) => {
        commit('resetState', getStorageItem())
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