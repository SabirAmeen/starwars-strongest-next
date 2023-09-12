import imageList from '../../public/starwars.json';

export const findCharacter:any = (id: number|string) => {
    return imageList.find((character) => character.id === id) || {}
}