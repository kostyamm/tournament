<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
    components: { Header, Footer },
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
    min-height: calc(100vh - 88px);
}
</style>