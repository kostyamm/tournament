<script>
import { computed, ref } from 'vue'

const props = {
    modelValue: [String, Number],
    label: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    description: String,
    error: String,
    required: Boolean,
}
export default {
    name: "TextField",
    inheritAttrs: false,
    props,
    setup(props, { emit, slots }) {
        const input = ref(null)

        const onInput = (e) => emit('update:modelValue', e.target.value)
        const validate = () => emit('validate', props.name)

        const disablePressing = (event) => {
            const disabledCodes = [187, 189, 69]

            if (props.type === 'number' && disabledCodes.some(code => code === event.keyCode)) {
                event.preventDefault();
            }
        }

        const hasActionSlot = computed(() => !!slots.action)

        return {
            input,
            onInput,
            validate,
            disablePressing,
            hasActionSlot,
        }
    },
}
</script>

<template>
    <div
        class="input-group"
        :class="{
            'input-group--has-error': error,
            'input-group--success': !error && modelValue
        }"
    >
        <label :class="{required}">{{ label }}</label>
        <div :class="[{'input-group__input--with-slot': hasActionSlot},'input-group__input']">
            <input
                ref="input"
                v-bind="$attrs"
                :id="name"
                :name="name"
                :type="type"
                :value="modelValue"
                @input="onInput"
                @blur="validate"
                @keyup="validate"
                @keydown="disablePressing"
                autocomplete="off"
            />

            <slot name="action" />
        </div>
        <transition name="fade-down" mode="out-in">
            <p class="input-group__help-message" v-if="error">
                {{ error }}
            </p>
            <p class="input-group__help-message" v-else-if="description && !modelValue">
                {{ description }}
            </p>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.fade-down-enter-active,
.fade-down-leave-active {
    transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-down-enter-from,
.fade-down-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

@mixin validate-style($color) {
    input {
        border-color: $color;

        &:hover, &:focus, &:focus-visible {
            border-color: $color;
        }
    }

    .input-group__help-message {
        color: $color;
    }
}

.input-group {
    position: relative;
    margin-bottom: 24px;
    width: 100%;

    label {
        position: relative;
        display: block;
        text-transform: uppercase;
        color: $color--grey;
        font-size: 12px;
        line-height: 18px;

        &:not(:empty) {
            &.required:before {
                content: '* ';
                font-weight: 600;
                font-size: 14px;
                color: $color--red;
            }

            &:after {
                content: ": ";
            }
        }
    }

    &__input {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        input {
            width: 100%;
            padding: 8px 12px 8px;
            font-size: 16px;
            line-height: 22px;

            background-color: $color--dark--light;
            border: 1px solid $color--dark--light;
            color: $color--white;

            outline: none;
            border-radius: $border-radius;

            transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out;

            ::placeholder, :-ms-input-placeholder, ::-ms-input-placeholder {
                color: $color--grey;
            }

            &:hover, &:focus, &:focus-visible {
                border-color: $color--yellow;
            }

            &:disabled {
                opacity: 0.4;
                border-color: $color--grey;
                background-color: transparent;
            }
        }

        &--with-slot {
            input {
                border-radius: $border-radius 0 0 $border-radius;
                border-right: none;
            }

            :deep(span) {
                border-radius: 0 $border-radius $border-radius 0;
            }
        }
    }

    &__help-message {
        position: absolute;
        bottom: -18px;
        left: 0;
        margin: 0;
        font-size: 14px;
        line-height: 16px;

        &::first-letter {
            text-transform: uppercase;
        }
    }

    &--has-error {
        @include validate-style($color--red)
    }

    &--success {
        @include validate-style($color--green)
    }
}

@media (prefers-color-scheme: light) {
    input {
        background-color: $color--grey;

        &:focus, &:focus-visible {
            border-color: $color--dark;
        }
    }
}
</style>