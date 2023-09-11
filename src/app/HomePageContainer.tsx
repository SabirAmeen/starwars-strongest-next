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
    const fetchResult = await fetch(`${process.env.WEBAPP_BASE_URL}/getMatchImages`, {cache: 'no-cache'});
    return await fetchResult.json();
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