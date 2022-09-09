<script>
import TextField from '../components/ui/TextField.vue'
import { object, string } from 'yup'
import { reactive } from 'vue'
import { useValidation } from '../hooks/useValidation.js'

const schema = object({
    name: string().min(6).required(),
    pass: string().min(10).transform(val => val || undefined)
})

export default {
    name: "Home",
    components: { TextField },
    setup() {
        const form = reactive({
            name: '',
            pass: ''
        })

        const { validateField, validateForm, errors } = useValidation(schema, form)

        const create = async () => {
            const { isValid } = await validateForm()
            console.log(isValid)
        }

        return { form, schema, create, errors, validateField}
    },
}
</script>

<template>
    <div class="container">
        <h1>home</h1>
        <TextField
            name="name"
            label="Full Name"
            placeholder="Your Name"
            required
            v-model="form.name"
            @keypress.enter="create"
            @validate="validateField"
            :error="errors.name"
        />
        <TextField
            name="pass"
            label="Password"
            placeholder="Your password"
            type="password"
            v-model="form.pass"
            @keypress.enter="create"
            @validate="validateField"
            :error="errors.pass"
        />

        <button @click="create">create</button>

    </div>
</template>

<style lang="scss" scoped>

</style>