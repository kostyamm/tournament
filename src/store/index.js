import { createStore, createLogger } from 'vuex'
import user from './modules/user.js'
import users from './modules/users.js'
import tournament from './modules/tournament.js'

const debug = process.env.NODE_ENV !== 'production'

const MAX_LENGTH_NOTICE = 3
const TIMEOUT_NOTICE = 8000

export default createStore({
    state: {
        notices: [],
    },
    getters: {
        notices: state => state.notices,
    },
    mutations: {
        addNotice(state, notice) {
            if (state.notices.length >= MAX_LENGTH_NOTICE) {
                state.notices.shift()
            }

            state.notices.push(notice);
        },
        removeNotice: (state, id) => state.notices = state.notices.filter(item => item.id !== id),
    },
    actions: {
        createNotice: ({ commit }, data) => {
            commit('addNotice', data)
            setTimeout(() => commit('removeNotice', data.id), TIMEOUT_NOTICE)
        },
    },
    modules: {
        user,
        users,
        tournament
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})