'use client';

import { useEffect, useState } from 'react';

const getLeaderboard = async () => {
    const fetchResult = await fetch(`${window.location.origin}/getLeaderboard`, { next: { tags: ['leaderboard'] } });
    const fetchData = await fetchResult.json();
    return fetchData.data || {}
}

const useLeaderboard = () => {
    const [characterList, setCharacterList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            setLoading(true);
            const leaderboard = await getLeaderboard();
            const { characterList=[] } = leaderboard || {};
            setCharacterList(characterList);
            setLoading(false)
        }
        fetchLeaderBoard();
    }, [])

    return ({
        characterList,
        isLoading
    })
}

export default useLeaderboard;