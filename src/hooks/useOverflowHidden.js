import { ref, watch } from 'vue'

export const useOverflowHidden = (value) => {
    const isHide = ref(value)

    watch(() => isHide.value, val => {
        document
            .querySelector('body')
            .classList[val ? 'add' : 'remove']('overflow-hidden')
    }, { immediate: true })
}
