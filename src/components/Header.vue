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
    height: 60px;
    max-height: 60px;
    margin-bottom: 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &:after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        content: ' ';
        height: 2px;
        background-color: $color--dark--light;
        border-radius: $border-radius;
    }

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