<script>
import Accordion from '../components/ui/Accordion.vue'

export default {
    name: "About",
    components: { Accordion },
}
</script>

<template>
    <div class="container--half">
        <h1>About</h1>
        <Accordion title="Single-elimination tournament" active>
            A single-elimination, knockout, or sudden death tournament is a type of elimination tournament where the
            loser of each match-up is immediately eliminated from the tournament. Each winner will play another in the
            next round, until the final match-up, whose winner becomes the tournament champion.
        </Accordion>
    </div>
</template>