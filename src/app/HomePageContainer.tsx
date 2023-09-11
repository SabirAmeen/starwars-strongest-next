import HomePage from './HomePage';

type imageItem = {
    id: number,
    image: string
}

interface imageList {
    firstImage: imageItem,
    secondImage: imageItem,
}

export const getMatchImageList = async (): Promise<imageList> => {
    return new Promise((resolve) => {
        resolve({
            firstImage: {
                id: 1,
                image: 'Adi_Gallia.webp',
            },
            secondImage: {
                id: 2,
                image: 'Adi_Gallia.webp',
            }
        })
    })
}

const HomePageContainer = async () => {
    const matchList = await getMatchImageList();
    return (
        <>
            <HomePage matchList={matchList} />
        </>
    )
}

export default HomePageContainer;