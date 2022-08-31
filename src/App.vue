<script>
import Header from './components/Header.vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
    components: { Header },
    setup() {
        const store = useStore()

        onMounted(() => store.dispatch('users/restoreState'))

        return {}
    },
}
</script>

<template>
    <Header />
    <router-view />
</template>
