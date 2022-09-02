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
        <div class="header__content container">
            <router-link to="/" class="header__content__logo">
                <mdi-light-shape-circle />
            </router-link>

            <span v-if="!isDesktop" class="icon-button" @click="showPanel = !showPanel">
                <mdi-light-menu />
            </span>
            <div v-else class="header__content__links">
                <router-link to="/generator">Generator</router-link>
                <router-link to="/tournament">Tournament</router-link>
            </div>
        </div>

        <SidePanel v-model="showPanel">
            <ul>
                <li>
                    <router-link to="/generator" @click="showPanel = false">Generator</router-link>
                </li>
                <li>
                    <router-link to="/tournament" @click="showPanel = false">Tournament</router-link>
                </li>
            </ul>
        </SidePanel>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 64px;
    max-height: 64px;

    &::before {
        position: absolute;
        content: ' ';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        background: rgb(0, 0, 0);
        background: linear-gradient(180deg, $color--dark 0%, rgba(0, 0, 0, 0) 100%);
        border-bottom: 1px solid rgba(115, 115, 115, 0.2);
    }

    &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: inherit;

        &__logo {
            color: $color--yellow;
            font-size: 18px;
            line-height: 18px;
        }

        &__links {
            display: flex;
            align-items: center;

            & a {
                color: $color--yellow;

                &:not(:last-child) {
                    margin-right: 12px;
                }
            }
        }
    }
}

@media (prefers-color-scheme: light) {
    .header:after {
        background-color: $color--grey;
    }
}
</style>