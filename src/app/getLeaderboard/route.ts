import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma';
import { findCharacter } from '../../serverUtils/findCharacter';

export async function GET(request: Request) {
  try {
    const dbResult: any = await prisma.vote_bank.findMany();
    let apiResult = [];
    if (dbResult.length) {
      apiResult = dbResult.map((row: any) => {
        const {id, image, name} = findCharacter(row.id);
        return ({
          id,
          image,
          name,
          percentage: (row.hits/row.totalhits) * 100,
        })
      }).sort((a,b) => b.percentage - a.percentage)
    }
    return NextResponse.json({
      data: {
        characterList: apiResult
      }
    })
  } catch (e) {
    return NextResponse.json({
      data: 'Something went wrong'
    })
  }
};