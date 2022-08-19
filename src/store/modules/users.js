import { initialUser } from '../../helpers/index.js'

const initialState = () => ({
    users: []
})

const state = initialState()

const getters = {
    initialState: () => initialState(),
    users: state => state.users,
}

const actions = {
}

const mutations = {
    resetState: (state) => Object.assign(state, initialState()),
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