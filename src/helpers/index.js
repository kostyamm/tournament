import cloneDeep from 'lodash-es/cloneDeep.js'
import clone from 'lodash-es/clone.js'
import chunk from 'lodash-es/chunk.js'

const uniqueId = (dependentArray) => {
    let id = Math.floor(Math.random() * 1000)

    const checkId = () => {
        const hasId = dependentArray.some(item => item.id === id)

        if (hasId) {
            ++id

            return checkId(id)
        }

        return id
    }

    return checkId()
}

export const isEven = (n) => n % 2 === 0

export const shouldPairs = (targetArray) => {
    const array = cloneDeep(targetArray)

    const length = array.length
    const lastIndex = length - 1

    if (!isEven(length)) {
        const randomIndex = Math.floor(Math.random() * lastIndex)

        const randomEl = clone(array[randomIndex])

        array.push(randomEl)
    }

    return chunk(array, 2)
}

export const initialUser = (name, array) => ({
    id: uniqueId(array),
    winner: false,
    name,
})