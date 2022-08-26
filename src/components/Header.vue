<script>
import SidePanel from './ui/SidePanel.vue'
import { useBreakpoints } from '../hooks/useBreakpoints.js'
import { ref } from 'vue'

export default {
    name: "Header",
    components: { SidePanel },
    setup() {
        const { isDesktop } = useBreakpoints()
        const showPanel = ref(false)

        const options = [
            { label: 'Users', to: '/' },
            { label: 'Tournament', to: '/tournament' },
        ]

        return { showPanel, options, isDesktop }
    },
}
</script>

<template>
    <div class="header">
        <router-link to="/" class="header__logo">
            Tournament
        </router-link>

        <span v-if="!isDesktop" class="icon-button" @click="showPanel = !showPanel">
            <mdi-light-menu />
        </span>
        <div v-else class="header__links">
            <router-link to="/">Users</router-link>
            <router-link to="/tournament">Tournament</router-link>
        </div>

        <SidePanel v-model="showPanel">
            <ul>
                <li>
                    <router-link to="/" @click="showPanel = false">Users</router-link>
                </li>
                <li>
                    <router-link to="tournament" @click="showPanel = false">Tournament</router-link>
                </li>
            </ul>
        </SidePanel>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.header {
    position: relative;
    height: 64px;
    max-height: 64px;
    margin-bottom: 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &__logo {
        font-size: 28px;
        font-weight: 900;
        line-height: 28px;
    }

    &__links {
        display: flex;
        align-items: center;

        & a:not(:last-child) {
            margin-right: 12px;
        }
    }
}

@media (prefers-color-scheme: light) {
    .header:after {
        background-color: $color--grey--light;
    }
}
</style>