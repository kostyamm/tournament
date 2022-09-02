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
            <div v-if="showPanel" class="side-panel" @click.self="onClose">
                <div class="side-panel__header">
                    <span class="icon-button" @click="onClose">
                        <mdi-light-arrow-left-circle />
                    </span>
                </div>
                <div class="side-panel__content">
                    <slot />
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.fade-enter-active,
.fade-leave-active {
    transition: all 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(-200px);
}

$side-panel-width: 320px;

.side-panel {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 110;
    max-width: $side-panel-width;
    background-color: $color--dark;
    border-right: 1px solid $color--yellow;

    &:after {
        position: absolute;
        content: ' ';
        left: calc($side-panel-width + 1px);
        top: 0;
        width: 100vw;
        height: 100vh;

        cursor: pointer;

        background-color: $color--dark;
        opacity: 0.8;
    }

    &__header {
        height: 64px;
        max-height: 64px;
        padding: 0 12px;
        margin-bottom: 12px;

        display: flex;
        align-items: center;
        justify-content: end;
    }

    &__content {
        padding: 0 12px;

        overflow-y: auto;
        height: calc(100vh - 76px);
    }
}

@media (prefers-color-scheme: light) {
    .side-panel {
        background-color: white;
    }
}
</style>