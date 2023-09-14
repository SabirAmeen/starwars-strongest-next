import Image from 'next/image';
import { getHostUrl } from '../../serverUtils/host';


const getLeaderboard = async () => {
  const fetchResult = await fetch(`${getHostUrl()}/getLeaderboard`, { next: { tags: ['leaderboard'] } });
  const fetchData = await fetchResult.json();
  return fetchData.data || {}
}

const Leaderboard = async () => {
  const leaderboardList = await getLeaderboard();
  const { characterList=[] } = leaderboardList || {};
    
  const renderLeaderBoard = (character: any) => {
    return (
      <li className="flex justify-between items-center px-5 py-5">
        <div className="text-center max-w-[50%]">
            <Image
              className="w-[100px] h-[100px] lg:w-40 lg:h-40 object-cover object-top my-5"
              alt={character.name}
              width={100}
              height={100}
              src={`/images/${character.image}`}
            />
            <span className="text-lg">{character.name}</span>
        </div>
        <span className="text-lg">
          {Math.round(character.percentage * 100) / 100}%
        </span>
      </li>
    )
  }
    
  return (
    <div className='max-w-[600px] mx-auto w-full px-5 h-full'>
        <ul className="border-white border-[1px] rounded">
            <li className="flex justify-between items-center border-b-[1px] px-5 py-5">
                <div className="text-center text-lg">
                    Character
                </div>
                <span className="text-lg">
                    Hits
                </span>
            </li>
            {
              characterList?.map((character: any) => renderLeaderBoard(character))
            }
        </ul>
    </div>
  );
}

export default Leaderboard;
