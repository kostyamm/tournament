<script>
import Tree from './components/Tree.vue'
import Tournament from './components/Tournament.vue'

export default {
    components: { Tournament, Tree },
    setup() {
        return {}
    },
}
</script>

<template>
    <div>
        <Tournament />
    </div>
<!--    <Tree />-->
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
