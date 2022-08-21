<script>
import { useStateSaver } from './hooks/useStateSaver.js'
import Header from './components/Header.vue'

export default {
    components: { Header },
    setup() {
        const { stateRestorer } = useStateSaver()
        stateRestorer(['users'])

        return {}
    },
}
</script>

<template>
    <Header />
    <router-view />
</template>
