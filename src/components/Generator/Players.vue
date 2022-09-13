<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import TextField from '../ui/TextField.vue'
import { useValidation } from '../../hooks/useValidation.js'
import { object, string } from 'yup'

const schema = object({
    userName: string().min(5).required(),
})

export default {
    name: "Players",
    components: { TextField },

    setup() {
        const store = useStore()
        const userRef = ref()

        const form = reactive({
            userName: '',
        })

        const { validateField, validateForm, errors } = useValidation(schema, form)

        const addUser = async () => {
            const { isValid } = await validateForm()

            if (!isValid) return

            store.commit('tournament/addUser', form.userName)

            form.userName = ''
            userRef.value?.input.focus()
        }

        const removeUser = (id) => store.commit('tournament/removeUser', id)

        const users = computed(() => store.getters['tournament/users'])

        return {
            form,
            userRef,
            users,
            addUser,
            removeUser,
            errors,
            validateField,
        }
    },
}
</script>

<template>
    <div class="users">
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
            >
                <template #action>
                    <span class="icon-button" @click="addUser">
                        <mdi-light-plus />
                    </span>
                </template>
            </TextField>
        </div>

        <TransitionGroup name="list" tag="ul" mode="out-in">
            <li v-for="user of users" :key="user.id" class="users__item">
                <div class="users__item__name">{{ user.name }}</div>

                <span class="icon-button--circle--red" @click="removeUser(user.id)">
                    <mdi-light-minus-circle />
                </span>
            </li>
        </TransitionGroup>
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