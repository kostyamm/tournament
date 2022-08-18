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

export const removeReference = (data) => JSON.parse(JSON.stringify(data))

export const removeDuplicates = (array) => [...new Map(array.map(item => [item.id, item])).values()]

export const shuffleArray = (array) => {
    const baseRandom = (lower, upper) => lower + Math.floor(Math.random() * (upper - lower + 1))

    let index = -1,
        length = array.length,
        lastIndex = length - 1

    while (++index < length) {
        let rand = baseRandom(index, lastIndex),
            value = array[rand]

        array[rand] = array[index]
        array[index] = value
    }

    array.length = length

    return array
}

export const initialUser = (name, array) => ({
    id: uniqueId(array),
    winner: false,
    name,
})