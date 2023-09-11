import { NextResponse } from 'next/server'
import { getMatchIds } from '../serverUtils/getMatchIds';

import imageList from '../../../public/starwars.json';

export async function GET() {
  const firstId = getMatchIds();
  const secondId = getMatchIds(firstId);
 
  return NextResponse.json({ 
    firstImage: imageList.find((image) => image.id === firstId),
    secondImage: imageList.find((image) => image.id === secondId)
  })
}