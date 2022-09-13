const initialState = () => ({
    user: {
        name: 'kostyamm',
        email: 'kostyamicha@gmail.com'
    },
    token: '1231232131'
})

const state = initialState()

const getters = {
    isAuth: (state) => !!state.token
}

const actions = {
    signIn: ({ commit }) => {
        commit('setUser')
    }
}

const mutations = {
    setUser: (state) => state.token = '1231232131'
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}