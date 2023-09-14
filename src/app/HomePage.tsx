"use client";

import React, { useState, useEffect } from 'react';
import Matcher from './components/Matcher';
import Loader from './components/Loader';

type imageItem = {
    id: number,
    image: string
}

interface imageList {
    firstImage: imageItem,
    secondImage: imageItem,
}

export const getMatchImageList = async (): Promise<imageList> => {
    const fetchResult = await fetch(`${window.location.origin}/getMatchImages`, {cache: 'no-cache'});
    return await fetchResult.json();
}

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [imgState, setImgState] = useState({ firstImg: null, secondImg: null });
    const [matchList, setMatchList] = useState<any>(null);

    useEffect(() => {
        const fetchMatchList = async () => {
            setLoading(true);
            const matchListResult = await getMatchImageList();
            setMatchList(matchListResult)
            setLoading(false);
        }
        fetchMatchList();
    }, [])

    const imageSelect = (imageSelected: number, firstImageID: number, secondImgId: number) => {
        setLoading(true);
        fetch(`${window.location.origin}/updateCharacter`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            winner: imageSelected,
            firstImageID,
            secondImgId
            }),
            cache: 'no-cache'
        })
        .then(res => res.json())
        .then((res) => {
            setImgState({
                firstImg: res?.firstImage || null,
                secondImg: res?.secondImage || null
            })
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const {firstImage, secondImage} = matchList || {};

    const firstImg = imgState.firstImg || firstImage;
    const secondImg = imgState.secondImg || secondImage;
    
    return (
        <div className='w-300 mx-auto h-full lg:h-auto'>
            <h2 className="text-center mb-10 text-3xl">Who is the strongest?</h2>
            {
                loading && <Loader />
            }
            <Matcher
                key={`${firstImg?.id}${secondImg?.id}`}
                firstImage={firstImg}
                secondImage={secondImg}
                disableBtn={loading}
                onSelect={imageSelect}
            />
        </div>
    )
}

export default HomePage;