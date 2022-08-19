<script>
import { useStateSaver } from './hooks/useStateSaver.js'

export default {
    setup() {
        const { stateRestorer } = useStateSaver()
        stateRestorer(['users'])

        return {}
    },
}
</script>

<template>
    <router-view />
</template>