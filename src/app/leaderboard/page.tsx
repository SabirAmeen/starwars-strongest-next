import Leaderboard from "./leaderboard";

const LeaderboardContainer = () => {
    
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
            <Leaderboard />
        </ul>
    </div>
  );
}

export default LeaderboardContainer;
