export const local1 = () => {
    const localWords = localStorage.getItem('words')
    if (localWords) {
        return JSON.parse(localWords)
    } else {
        return []
    }
}

export const updateLocal = (todos) => {
    localStorage.setItem('words', JSON.stringify(todos))
}
