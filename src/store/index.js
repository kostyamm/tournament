import { createStore, createLogger } from 'vuex'
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
        restoreState: (state, { stateName, stateData }) => Object.assign(state[stateName], stateData),
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
        users,
        tournament
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})