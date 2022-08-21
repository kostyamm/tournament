<script>
import { useOverflowHidden } from '../../hooks/useOverflowHidden.js'
import { toRef } from 'vue'

export default {
    name: "SidePanel",
    props: {
        modelValue: Boolean,
    },
    setup(props, { emit }) {
        const showPanel = toRef(props, 'modelValue')
        useOverflowHidden(showPanel)

        const onClose = () => emit('update:modelValue', false)

        return { showPanel, onClose }
    },
}
</script>

<template>
    <teleport to="body">
        <transition name="fade">
            <div v-if="showPanel" class="side" @click.self="onClose">
                <div class="side__panel">
                    <slot />
                </div>

                <span class="icon-button side__close" @click="onClose">
                    <mdi-light-arrow-left-circle />
                </span>
            </div>
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.fade-enter-active,
.fade-leave-active {
    transition: all 0.08s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

$side-width: 320px;

.side {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 110;
    height: 100vh;
    width: 100vw;
    background-color: rgba(100, 100, 100, 0.5);

    &__panel {
        width: calc(#{$side-width} - 32px);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: $color--dark;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 70px 16px 16px;
    }

    &__close {
        position: absolute;
        top: 15px;
        left: calc(#{$side-width - 62px});
    }
}
@media (prefers-color-scheme: light) {
    .side__panel {
        background-color: white;
    }
}
</style>