<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
    components: { Header, Footer },
    setup() {
        const store = useStore()

        onMounted(() => store.dispatch('users/restoreState'))

        return {}
    },
}
</script>

<template>
    <Header />
    <div class="content container">
        <router-view />
    </div>
    <Footer />
</template>

<style lang="scss" scoped>
.content {
    padding-top: 88px;
    padding-bottom: 88px;
    min-height: calc(100vh - 240px);
}
</style>