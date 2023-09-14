"use client"

import Image from 'next/image';
import useLeaderboard from './dataHook';
import Loader from '../components/Loader';

export default function Leaderboard() {
    const { characterList=[], isLoading } = useLeaderboard();

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

    if (isLoading) {
        return <Loader />
    }

    return characterList?.map((character: any) => renderLeaderBoard(character))
}