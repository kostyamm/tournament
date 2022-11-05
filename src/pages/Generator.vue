<script>
import Players from '../components/Generator/Players.vue'
import { useRouter } from 'vue-router'

export default {
    name: "Generator",
    components: { Players },
    setup() {
        const router = useRouter()

        return {
            router,
        }
    },
}
</script>

<template>
    <div class="container--half">
        <Players />
        <button @click="router.push('/tournament')" class="outline">Go to tournament</button>
    </div>
</template>

<style lang="scss" scoped>
button {
    margin-top: 24px;
}
</style>