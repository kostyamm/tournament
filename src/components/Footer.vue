<script>
export default {
    name: "Footer",
    setup() {
        const options = [
            { label: 'Login', to: '/login', action: () => toRoute('/login') },
            { label: 'User', to: '/user', action: () => toRoute('/user') },
            { label: 'Generator', to: '/generator', action: () => toRoute('/generator') },
            { label: 'Tournament', to: '/tournament', action:  () => toRoute('/tournament') },
            { label: 'About', to: '/about', action:  () => toRoute('/about') },
        ]

        return { options }
    }
}
</script>

<template>
    <div class="footer">
        <div class="footer__content container">
            <ul>
                <li v-for="(option, index) in options" :key="index" @click="option.action">
                    {{option.label}}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.footer {
    position: relative;
    padding: 24px 0;

    &::after {
        position: absolute;
        content: ' ';
        top: 0;
        left: 0;
        right: 0;
        z-index: -1;
        border-top: 1px solid $color--grey--border;
    }

    &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: inherit;
    }
}
</style>