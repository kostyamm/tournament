<script>
import TextField from '../components/ui/TextField.vue'
import { object, string } from 'yup'
import { reactive } from 'vue'
import { useValidation } from '../hooks/useValidation.js'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const schema = object({
    name: string().required().min(6),
    password: string().required().min(6).transform(val => val || undefined)
})

export default {
    name: "Login",
    components: { TextField },
    setup () {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()

        const form = reactive({
            name: 'kostyamm',
            password: 'qwerty'
        })

        const { validateField, validateForm, errors } = useValidation(schema, form)

        const signIn = async () => {
            const { isValid } = await validateForm()

            if (isValid) {
                await store.dispatch('user/signIn')

                router.push(route.query.to || '/')
            }
        }

        return { form, schema, signIn, errors, validateField}
    }
}
</script>

<template>
    <div class="container--half">
        <h1>Login</h1>
        <TextField
            name="name"
            label="Full Name"
            placeholder="Your Name"
            required
            v-model="form.name"
            @keypress.enter="signIn"
            @validate="validateField"
            :error="errors.name"
        />
        <TextField
            name="password"
            label="Password"
            placeholder="Your password"
            type="password"
            required
            v-model="form.password"
            @keypress.enter="signIn"
            @validate="validateField"
            :error="errors.password"
        />

        <button @click="signIn">Sign In</button>
    </div>
</template>
