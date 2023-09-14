"use client";

import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import Matcher from './components/Matcher';
import Loader from './components/Loader';

interface HomeProps {
    matchList: any
}

const HomePage = (props: HomeProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imgState, setImgState] = useState({ firstImg: null, secondImg: null });

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
            router.refresh();
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const {firstImage, secondImage} = props?.matchList || {};

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