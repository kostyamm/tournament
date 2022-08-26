const uniqueId = (dependentArray) => {
    let id = Math.floor(Math.random() * 1000)

    const checkId = () => {
        const hasId = dependentArray.some(item => item.id === id)

        return hasId ? checkId(++id) : id
    }

    return checkId()
}

export const initialUser = (name, array) => ({ id: uniqueId(array), name })

export const isEven = (n) => n % 2 === 0
