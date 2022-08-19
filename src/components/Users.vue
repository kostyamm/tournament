<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useStateSaver } from '../hooks/useStateSaver.js'

export default {
    name: "Users",
    setup () {
        useStateSaver('users')

        const store = useStore()
        const user = ref()

        const users = computed(() => store.getters['users/users'])
        const addUser = () => store.commit('users/addUser', user.value)
        const removeUser = (id) => store.commit('users/removeUser', id)

        return {
            user,
            users,
            addUser,
            removeUser
        }
    }
}
</script>

<template>
    <h1>users</h1>
    <p>If you edit users list after creating a round, all rounds will be reset</p>

    <input type="text" v-model="user" />
    <button @click="addUser">add</button>

    <div v-for="user of users" :key="user.id">
        <input type="text" v-model="user.name" />{{ user.winner }}
        <button @click="removeUser(user.id)">remove</button>
    </div>
</template>

<style scoped>
</style>