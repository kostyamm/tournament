import { reactive } from 'vue'
import isEmpty from 'lodash-es/isEmpty.js'

export const useValidation = (schema, form) => {
    const errors = reactive({})

    const validateForm = async () => {
        try {
            await schema.validate(form, { abortEarly: false })
        } catch (e) {
            e.inner.forEach(error => {
                if (errors[error.path]) return

                errors[error.path] = error.message
            })
        }

        return {
            isValid: isEmpty(errors)
        }
    }

    const validateField = async (field) => {
        try {
            await schema.validateAt(field, form)
            delete errors[field];
        } catch (e) {
            errors[e.path] = e.message
        }
    }

    return {
        validateField,
        validateForm,
        errors
    }
}