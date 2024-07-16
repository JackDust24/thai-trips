import db from '@/database/database';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  console.log('Request Params:', req, id);

  const trip = await db.trip.findUnique({
    where: { id },
    select: { tripDescPath: true, name: true },
  });

  if (trip == null) return notFound();

  const { size } = await fs.stat(trip.tripDescPath);
  const file = await fs.readFile(trip.tripDescPath);
  const extension = trip.tripDescPath.split('.').pop();

  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${trip.name}.${extension}"`,
      'Content-Length': size.toString(),
    },
  });
}
