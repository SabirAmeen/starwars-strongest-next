import HomePage from './HomePage';

export const getMatchImageList = async () => {
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