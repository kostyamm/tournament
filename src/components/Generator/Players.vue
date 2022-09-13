<script>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Accordion from '../ui/Accordion.vue'
import TextField from '../ui/TextField.vue'
import { useValidation } from '../../hooks/useValidation.js'
import { object, string } from 'yup'

const schema = object({
    userName: string().required(),
})

export default {
    name: "Players",
    components: { TextField, Accordion },

    setup() {
        const router = useRouter()
        const store = useStore()
        const userRef = ref()

        const form = reactive({
            userName: ''
        })

        const { validateField, validateForm, errors } = useValidation(schema, form)

        const addUser = async () => {
            const { isValid } = await validateForm()

            if (!isValid) return

            store.commit('users/addUser', form.userName)

            form.userName = ''
            userRef.value?.input.focus()
        }

        const removeUser = (id) => store.commit('users/removeUser', id)
        const saveState = () => store.dispatch('users/saveState')

        const users = computed(() => store.getters['users/users'])

        onMounted(() => window.addEventListener('pagehide', saveState))
        onUnmounted(() => {
            saveState()
            window.removeEventListener('pagehide', saveState)
        })

        return {
            form,
            userRef,
            users,
            addUser,
            removeUser,
            router,
            errors,
            validateField
        }
    },
}
</script>

<template>
    <div class="users container--half">
        <div class="users__create">
            <TextField
                ref="userRef"
                name="userName"
                label="Player name"
                placeholder="Enter player name"
                required
                v-model="form.userName"
                @keypress.enter="addUser"
                @validate="validateField"
                :error="errors.userName"
            />
            <div class="icon-button" @click="addUser">
                <mdi-light-plus />
            </div>
        </div>

        <Accordion v-if="users.length" :title="`${users.length} user(s) added`" active>
            <TransitionGroup name="list" tag="ul" mode="out-in">
                <li v-for="user of users" :key="user.id" class="users__item">
                    <div class="users__item__name">{{ user.name }}</div>

                    <span class="icon-button--circle--red" @click="removeUser(user.id)">
                        <mdi-light-minus-circle />
                    </span>
                </li>
            </TransitionGroup>
        </Accordion>

        <button @click="router.push('/tournament')">Go to tournament</button>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease-in-out;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(40px);
}

.users {
    ul {
        margin: -12px;
    }

    &__create {
        display: flex;
        align-items: center;

        & input {
            margin-right: 12px;
        }
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;

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