<script>
import { computed, isProxy, onMounted, reactive, ref, watch } from 'vue'
import { initialUser, shuffleArray, removeReference, removeDuplicates, isEven } from '../helpers/index.js'

export default {
    name: "Tournament",
    setup() {
        const user = ref()
        const options = reactive({
            users: [],
            rounds: {},
            activeRound: 0,
            pagination: [],
            winner: null
        })

        const resetOptions = () => {
            options.users = []
            resetRounds()
        }

        const resetRounds = () => {
            options.rounds = {}
            options.activeRound = 0
            options.pagination = []
            options.winner = null
        }

        const shuffleUsers = () => options.users = shuffleArray(options.users)

        const addUser = () => options.users.push(initialUser(user.value, options.users))

        const removeUser = (id) => {
            if (Object.keys(options.rounds).length) {
                resetRounds()
            }

            options.users = options.users.filter(item => item.id !== id)
        }

        const setWinner = (pair, gamer) => {
            const opponent = pair.find(opponent => opponent.id !== gamer.id)

            opponent.winner = false
            gamer.winner = true
        }

        const shouldPairs = (preparedArray) => {
            const pairs = preparedArray.reduce((result, currentValue, index, array) => {
                const length = array.length
                const lastIndex = length - 1

                const isLast = lastIndex === index

                if (!isEven(length) && isLast) {
                    const opponentIndex = () => Math.floor(Math.random() * lastIndex)
                    const opponent = array[opponentIndex()]

                    result.push([currentValue, opponent])

                    return result
                }

                if (isEven(index)) {
                    const end = index + 2

                    result.push(array.slice(index, end))
                }

                return result
            }, [])

            return removeReference(pairs)
        }

        const addRound = () => options.pagination.push(++options.activeRound)
        const resetWinners = (array) => array.map(item => ({
            ...item,
            winner: false,
        }))

        const createRound = () => {

            if (options.activeRound === 0) {
                shuffleUsers()

                addRound()

                return options.rounds[options.activeRound] = shouldPairs(options.users)
            }

            if (normalizedRound.value?.length === 1) {
                return options.winner = normalizedRound.value[0]
            }

            options.rounds[options.activeRound + 1] = shouldPairs(resetWinners(normalizedRound.value))

            addRound()
        }

        const isRoundCompleted = computed(() => normalizedRound.value?.every(item => isProxy(item)))

        const normalizedRound = computed(() => {
            if (!options.rounds[options.activeRound]) {
                return
            }

            const round = options.rounds[options.activeRound].reduce((result, currentValue) => {
                const [first, second] = currentValue

                const winner = first.winner && first || second.winner && second

                result.push(winner)

                return result
            }, [])

            return removeDuplicates(round)
        })


        onMounted(() => {
            options.users.push(initialUser('test 1', options.users))
            options.users.push(initialUser('test 4', options.users))
            options.users.push(initialUser('test 5', options.users))
        })

        return {
            user, options, addUser, removeUser, setWinner, createRound, isRoundCompleted, resetOptions
        }
    },
}
</script>

<template>
    <input type="text" v-model="user" />
    <button @click="addUser">add</button>
    <button @click="createRound" :disabled="options.users.length <= 1">createRound</button>
    <div v-for="user of options.users" :key="user.id">
        <input type="text" v-model="user.name" />{{ user.winner }}
        <button @click="removeUser(user.id)">remove</button>
    </div>

    <div v-if="options.winner">
        <h2>winner {{ options.winner.name }}</h2>
    </div>

    <h2>round {{ options.activeRound }}</h2>
    <div v-for="(pair, roundIndex) of options.rounds[options.activeRound]" :key="roundIndex" class="pair">
        <div v-for="gamer of pair" :key="gamer.id" @click="setWinner(pair, gamer)">
            {{ gamer.name }} {{ gamer.winner && gamer.winner.toString() }}
        </div>
    </div>


    <button @click="createRound" :disabled="!isRoundCompleted">next</button>
    <button @click="resetOptions()">resetOptions</button>
    <div v-for="item in options.pagination" :key="item" @click="options.activeRound = item">
        {{ item }}
    </div>
    <!--    <div class="tree">-->
    <!--        <ul>-->
    <!--            <li v-for="user of options.users" :key="user.id">-->
    <!--                <a href="">{{ user.name }}</a>-->
    <!--            </li>-->
    <!--        </ul>-->
    <!--    </div>-->
</template>

<style scoped>

.pair {
    display: flex;
    justify-content: center;
}

.pair *:first-child:after {
    content: 'VS';
    padding: 0 12px;
}

</style>