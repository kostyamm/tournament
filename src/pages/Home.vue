<script>
import Users from '../components/Users.vue'
import { useRouter } from 'vue-router'

export default {
    name: "Home",
    components: { Users },
    setup () {
        const router = useRouter()

        const goToTournament = () => router.push('/tournament')

        return { goToTournament }
    }
}
</script>

<template>
    <Users />
    <button @click="goToTournament">
        Tournament
    </button>
</template>

<style scoped>
</style>