<script>
import SidePanel from './ui/SidePanel.vue'
import { useBreakpoints } from '../hooks/useBreakpoints.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: "Header",
    components: { SidePanel },
    setup() {
        const { isDesktop } = useBreakpoints()
        const showPanel = ref(false)
        const router = useRouter()

        const toRoute = (to) => {
            showPanel.value = false
            router.push(to)
        }

        const options = [
            { label: 'Login', to: '/login', action: () => toRoute('/login') },
            { label: 'User', to: '/user', action: () => toRoute('/user') },
            { label: 'Generator', to: '/generator', action: () => toRoute('/generator') },
            { label: 'Tournament', to: '/tournament', action:  () => toRoute('/tournament') },
            { label: 'About', to: '/about', action:  () => toRoute('/about') },
        ]

        return { showPanel, options, isDesktop, router }
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
                <router-link v-for="(option, index) in options" :key="index" :to="option.to">
                    {{ option.label }}
                </router-link>
            </div>
        </div>

        <SidePanel v-model="showPanel">
            <ul>
                <li v-for="(option, index) in options" :key="index" @click="option.action">
                    {{option.label}}
                </li>
            </ul>
        </SidePanel>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

ul {
    margin: 0 -12px;

    li {
        font-size: 18px;
        font-weight: 500;
        color: $color--yellow;
        background-color: transparent;
        transition: background-color 0.3s ease;
        cursor: pointer;

        &:hover {
            background-color: $color--yellow;
            color: $color--dark;
        }
    }
}

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
        border-bottom: 1px solid $color--grey--border;
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