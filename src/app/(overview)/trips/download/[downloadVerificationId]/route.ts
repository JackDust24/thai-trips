import db from '@/database/database';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  console.log('Request Params:', req, downloadVerificationId);

  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { trip: { select: { tripDescPath: true, name: true } } },
  });

  if (data == null) {
    return NextResponse.redirect(new URL('/trips/download/expired', req.url));
  }

  const { size } = await fs.stat(data.trip.tripDescPath);
  const file = await fs.readFile(data.trip.tripDescPath);
  const extension = data.trip.tripDescPath.split('.').pop();

  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${data.trip.name}.${extension}"`,
      'Content-Length': size.toString(),
    },
  });
}
