const vowels = ["a", "e", "i", "o", "u"];

export const getLastWord = (string) => {
    const array = string.split(" ")
    const arrayLength = array.length
    const lastWord = array[arrayLength - 1]
    return lastWord
}

export const removeLastWord = (string) => {
    const array = string.split(" ")
    const arrayLength = array.length
    const newString = array.splice(0, arrayLength - 1).join(" ")
    return newString
}

export const getArticle = (string) => {
    const firstChar = string.split("")[0].toLowerCase()
    return vowels.includes(firstChar) ? "an" : "a"
}