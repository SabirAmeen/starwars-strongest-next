export const getMatchIds = (excludeId: number = 0) => {
    let newId;
    do {
        newId = Math.floor(Math.random() * 87) + 1;
    } while (newId === excludeId)
    return newId;
}