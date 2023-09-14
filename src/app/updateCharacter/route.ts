import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache';
import { getMatchIds } from "../../serverUtils/getMatchIds";
import imageList from "../../../public/starwars.json";
import prisma from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const loser = requestBody.firstImageID === requestBody.winner ? requestBody.secondImgId : requestBody.firstImageID;
    const upCreateWinner = prisma.vote_bank.upsert({
      where: {
        id: requestBody.winner,
      },
      update: {
        hits: { increment: 1 },
        totalhits: { increment: 1 },
      },
      create: {
        id: requestBody.winner,
        hits: 1,
        totalhits: 1,
      }
    });
    const upCreateLoser = prisma.vote_bank.upsert({
      where: {
        id: loser,
      },
      update: {
        totalhits: { increment: 1 },
      },
      create: {
        id: loser,
        hits: 0,
        totalhits: 1,
      }
    })
    await prisma.$transaction([upCreateWinner, upCreateLoser])
    const firstId = getMatchIds();
    const secondId = getMatchIds(firstId);
    revalidatePath('/getLeaderboard')
    return NextResponse.json({
      firstImage: imageList.find((image) => image.id === firstId),
      secondImage: imageList.find((image) => image.id === secondId),
    })
  }
  catch(e) {
    return NextResponse.json({
      error: 'something went wrong',
    })
  }
}
