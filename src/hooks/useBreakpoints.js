import { computed, onMounted, onUnmounted, ref } from 'vue'

const MOBILE_WIDTH = 600
const TABLET_WIDTH = 960

export const useBreakpoints = () => {
    const windowWidth = ref(window.innerWidth)

    const onResize = () => windowWidth.value = window.innerWidth

    const isMobile = computed(() => windowWidth.value <= MOBILE_WIDTH)
    const isTablet = computed(() => windowWidth.value <= TABLET_WIDTH && windowWidth.value > MOBILE_WIDTH)
    const isDesktop = computed(() => windowWidth.value > TABLET_WIDTH)

    onMounted(() => window.addEventListener('resize', onResize))
    onUnmounted(() => window.removeEventListener('resize', onResize))

    return { isMobile, isTablet, isDesktop }
}