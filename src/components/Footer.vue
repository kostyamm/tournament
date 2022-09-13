<script>
export default {
    name: "Footer",
}
</script>

<template>
    <div class="footer">
        <div class="footer__content container">
            Footer
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.footer {
    position: relative;
    bottom: 0;
    right: 0;
    left: 0;
    height: 64px;
    max-height: 64px;

    &::after {
        position: absolute;
        content: ' ';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        background: rgb(0, 0, 0);
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, $color--dark 100%);
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