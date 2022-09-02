<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Accordion from '../ui/Accordion.vue'

export default {
    name: "Players",
    components: { Accordion },

    setup() {
        const router = useRouter()

        const store = useStore()
        const user = ref()
        const userEl = ref()

        const users = computed(() => store.getters['users/users'])
        const addUser = () => {
            store.commit('users/addUser', user.value)

            user.value = ''
            userEl.value?.focus()
        }
        const removeUser = (id) => store.commit('users/removeUser', id)
        const saveState = () => store.dispatch('users/saveState')

        onMounted(() => window.addEventListener('pagehide', saveState))
        onUnmounted(() => {
            saveState()
            window.removeEventListener('pagehide', saveState)
        })

        return {
            user,
            userEl,
            users,
            addUser,
            removeUser,
            router,
        }
    },
}
</script>

<template>
    <div class="players container--half">
        <h1>Players</h1>

        <div class="players__create">
            <input ref="userEl" placeholder="Enter player name..." type="text" v-model="user"  @keypress.enter="addUser"/>
            <div class="icon-button" @click="addUser">
                <mdi-light-plus />
            </div>
        </div>

        <Accordion v-if="users.length" :title="`${users.length} Player(s) added`" active>
            <div v-for="user of users" :key="user.id" class="players__item">
                <div class="players__item__name">{{ user.name }}</div>
                    <span class="icon-button" @click="removeUser(user.id)">
                    <mdi-light-minus />
                </span>
            </div>
        </Accordion>

        <button @click="router.push('/tournament')">Go to tournament</button>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.players {
    &__create {
        display: flex;
        align-items: center;
        margin-bottom: 24px;

        & input {
            margin-right: 12px;
        }
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:not(:last-child) {
            margin-bottom: 12px;
        }

        &__name {
            font-size: 18px;
            margin-right: 12px;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>