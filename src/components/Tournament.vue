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
            options.winner = null

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

        const addRound = () => {
            const nextRound = ++options.activeRound
            if (options.pagination.every(roundNum => roundNum !== nextRound)) {
                options.pagination.push(nextRound)
            }
        }

        const startTournament = () => {
            resetRounds()

            addRound()

            shuffleUsers()

            return options.rounds[options.activeRound] = shouldPairs(options.users)
        }

        const createRound = () => {
            options.rounds[options.activeRound + 1] = shouldPairs(preparedWinners.value)

            addRound()
        }

        const normalizedRound = computed(() => {
            const round = currentRound.value

            return round?.reduce((result, currentValue) => result.concat(currentValue), [])
        })

        const roundWinners = computed(() => normalizedRound.value?.filter(item => item.winner))

        const preparedWinners = computed(() => {
            if (!roundWinners.value) {
                return
            }

            return removeDuplicates(roundWinners.value).map(item => ({
                ...item,
                winner: false,
            }))
        })

        const currentRound = computed(() => options.rounds[options.activeRound])

        const isCompleted = computed(() => {
            const necessaryWinners = currentRound.value?.length
            const winnersCount = roundWinners.value?.length

            return !options.winner && necessaryWinners === winnersCount
        })

        const roundWinnersHandler = (round) => {
            const necessaryWinners = currentRound.value?.length
            const winnersCount = round?.length
            const isLastRound = [winnersCount, necessaryWinners].every(i => i === 1)

            if (!winnersCount) {
                return
            }

            if (isLastRound) {
                return options.winner = round[0]
            }

            const [first, second] = round

            if (first?.id === second?.id && necessaryWinners === 2) {
                options.winner = first
            }
        }
        watch(() => roundWinners.value, roundWinnersHandler, { deep: true })

        onMounted(() => {
            options.users.push(initialUser('test 1', options.users))
            options.users.push(initialUser('test 4', options.users))
            options.users.push(initialUser('test 3', options.users))
            options.users.push(initialUser('test 2', options.users))
            options.users.push(initialUser('test 5', options.users))
        })

        return {
            user, options, addUser, removeUser, setWinner, createRound, isCompleted, resetRounds, resetOptions, startTournament, currentRound
        }
    },
}
</script>

<template>
    <input type="text" v-model="user" />
    <button @click="addUser">add</button>
    <button @click="startTournament" :disabled="options.users.length <= 1">startTournament</button>

    <div>
        <button @click="resetOptions()">RESET TOURNAMENT</button>
        <button @click="resetRounds()">RESET ROUNDS</button>
    </div>

    <p>If you edit users after creating a round, all rounds will be reset</p>
    <div v-for="user of options.users" :key="user.id">
        <input type="text" v-model="user.name" />{{ user.winner }}
        <button @click="removeUser(user.id)">remove</button>
    </div>

    <div v-if="options.winner">
        <h2>winner {{ options.winner.name }}</h2>
    </div>

    <h2>round {{ options.activeRound }}</h2>
    <div v-for="(pair, roundIndex) of currentRound" :key="roundIndex" class="pair">
        <div v-for="gamer of pair" :key="gamer.id" @click="setWinner(pair, gamer)">
            {{ gamer.name }} {{ gamer.winner && gamer.winner.toString() }}
        </div>
    </div>


    <button @click="createRound" :disabled="!isCompleted">next</button>
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