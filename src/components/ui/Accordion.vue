<script>
import { ref } from 'vue'

export default {
    name: "Accordion",
    props: {
        title: {
            type: String,
            required: true,
        },
        active: Boolean,
    },
    setup({ active }) {
        const show = ref(active)

        return { show }
    },
}
</script>

<template>
    <div class="accordion">
        <div
            @click="show = !show"
            :class="[
                'accordion__title',
                { 'accordion__title--show' : show }
            ]"
        >
            <div>{{ title }}</div>
            <transition name="fade" mode="out-in">
                <mdi-light-chevron-up v-if="show" />
                <mdi-light-chevron-down v-else />
            </transition>
        </div>
        <transition name="fade-down" mode="out-in">
            <div v-if="show" class="accordion__content">
                <slot />
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.fade-enter-active,
.fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(-6px);
    opacity: 0;
}

.fade-down-enter-active,
.fade-down-leave-active {
    transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-down-enter-from,
.fade-down-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
.accordion {
    margin-bottom: 24px;

    &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $color--dark--light;
        color: $color--white;
        font-size: 18px;
        cursor: pointer;
        height: 48px;
        padding: 0 12px;
        border: 1px solid transparent;
        border-radius: $border-radius;

        transition: border-color 0.3s ease, border-radius 0.3s ease, color 0.3s ease;

        svg {
            font-size: 12px;
        }

        &--show {
            border-color: $color--grey--border;
            color: $color--yellow;
            border-radius: $border-radius $border-radius 0 0;
        }
    }

    &__content {
        border: 1px solid $color--grey--border;
        border-top: none;
        border-radius: 0 0 $border-radius $border-radius;
        padding: 12px;
    }
}
</style>