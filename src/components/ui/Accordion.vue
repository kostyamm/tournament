<script>
import { ref } from 'vue'

export default {
    name: "Accordion",
    props: {
        title: {
            type: String,
            required: true,
        },
        active: Boolean
    },
    setup({ active }) {
        const show = ref(active)

        return { show }
    },
}
</script>

<template>
    <div class="accordion">
        <div class="accordion__title" @click="show = !show">
            <transition name="fade" mode="out-in">
                <mdi-light-arrow-up-circle v-if="show" />
                <mdi-light-arrow-down-circle v-else />
            </transition>
            <div>{{ title }}</div>
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

.fade-enter-active {
    transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-leave-active {
    transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(2px);
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

        color: $color--yellow;
        font-size: 18px;
        cursor: pointer;

        svg {
            font-size: 12px;
            margin-right: 4px;
        }
    }

    &__content {
        border-left: 1px solid $color--yellow;
        background-color: $color--dark--light;
        border-radius: 0 $border-radius $border-radius 0;
        padding: 12px;
        margin-top: 12px;
    }
}
</style>