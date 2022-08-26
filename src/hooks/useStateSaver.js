import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import isEqual from 'lodash-es/isEqual.js'

const logInfoStyle = `background-color: darkcyan; color: white; padding: 2px 4px; border-radius: 2px`

const removeReference = (data) => JSON.parse(JSON.stringify(data))

export const stateStorage = {
    get (name) {
        return JSON.parse(localStorage.getItem(name))
    },
    set (name, data) {
        const value = JSON.stringify(data)
        localStorage.setItem(name, value)
    }
}

export const useStateSaver = (stateName) => {
    const store = useStore()

    const stateRestorer = (stateNames) => {
        for (let i = 0; i < stateNames.length; i++) {
            const stateName = stateNames[i]
            const savedState = stateStorage.get(stateName)

            if (!store.hasModule(stateName) || !savedState) {
                return
            }

            console.info(`%c[${stateName}] state restored 🎉`, logInfoStyle);

            store.commit('restoreState', {
                stateName,
                stateData: savedState
            })
        }
    }

    if (!stateName || !store.hasModule(stateName)) {
        return { stateRestorer }
    }

    const save = () => {
        const initialState = removeReference(store.getters[`${stateName}/initialState`])
        const currentState = removeReference(store.state[stateName])
        const savedState = stateStorage.get(stateName)

        const isRestored = isEqual(currentState, savedState)
        const isInitialState = isEqual(currentState, initialState)

        if (isInitialState) {
            stateStorage.set(stateName, null)
        }

        if (isRestored) {
            return
        }

        console.info(`%c[${stateName}] state saved 🛟`, logInfoStyle);

        stateStorage.set(stateName, store.state[stateName])
    }

    onMounted(() => window.addEventListener('pagehide', save))
    onUnmounted(() => {
        save()
        window.removeEventListener('pagehide', save)
    })

    return { stateRestorer }
}