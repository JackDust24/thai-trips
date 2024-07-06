'use server';

import db from '@/database/database';
import { z } from 'zod';
import fs from 'fs/promises';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const fileSchema = z.instanceof(File);
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith('image/')
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInBaht: z.coerce.number().int().min(1),
  location: z.string().min(1),
  numberOfPlaces: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0),
  image: imageSchema.refine((file) => file.size > 0, 'Required'),
});

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function addTrip(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir('trips', { recursive: true });
  const tripDescPath = `trips/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(tripDescPath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir('public/trips', { recursive: true });
  const imagePath = `/trips/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.trip.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInBaht: data.priceInBaht,
      numberOfPlaces: data.numberOfPlaces,
      tripDescPath,
      imagePath,
      location: data.location,
    },
  });

  revalidatePath('/');
  revalidatePath('/trips');

  redirect('/dashboard/trips');
}

export async function updateTrip(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const trip = await db.trip.findUnique({ where: { id } });

  if (trip == null) return notFound();

  let tripDescPath = trip.tripDescPath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(trip.tripDescPath);
    tripDescPath = `trips/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(
      tripDescPath,
      Buffer.from(await data.file.arrayBuffer())
    );
  }

  let imagePath = trip.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${trip.imagePath}`);
    imagePath = `/trips/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.trip.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInBaht: data.priceInBaht,
      numberOfPlaces: data.numberOfPlaces,
      location: data.location,
      tripDescPath,
      imagePath,
    },
  });

  revalidatePath('/');
  revalidatePath('/trips');

  redirect('/dashboard/trips');
}

export async function toggleTripAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.trip.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath('/');
  revalidatePath('/trips');
}

export async function deleteTrip(id: string) {
  const trip = await db.trip.delete({ where: { id } });

  if (trip == null) return notFound();

  await fs.unlink(trip.tripDescPath);
  await fs.unlink(`public${trip.imagePath}`);

  revalidatePath('/');
  revalidatePath('/trips');
}
