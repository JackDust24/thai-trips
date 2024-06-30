import { Prisma } from '@prisma/client';
import db from '@/database/database';
import data from '@/app/_mocks/mockItemData.json';
import { Trip as MockTrip } from '@/types/types';

export async function getTripData(
  createdAfter: Date | null,
  createdBefore: Date | null
) {
  const createdAtQuery: Prisma.OrderWhereInput['createdAt'] = {};

  if (createdAfter) createdAtQuery.gte = createdAfter;
  if (createdBefore) createdAtQuery.lte = createdBefore;

  //TODO: Put proper db data when remove mock
  /*
  const [activeCount, inactiveCount, chartData] = await Promise.all([
    db.trip.count({ where: { isAvailableForPurchase: true } }),
    db.trip.count({ where: { isAvailableForPurchase: false } }),
    db.trip.findMany({
      select: {
        name: true,
        orders: {
          select: { pricePaidInBaht: true },
          where: { createdAt: createdAtQuery },
        },
      },
    }),
  ]); */

  const { mockActiveCount, mockInActiveCount, mockChartData } =
    retrieveMockData(createdAtQuery);

  return {
    chartData: mockChartData
      .map((trip) => {
        return {
          name: trip.name,
          revenue: trip.orders.reduce((sum, order) => {
            return sum + order.pricePaidInBaht;
          }, 0),
        };
      })
      .filter((trip) => trip.revenue > 0),
    activeCount: mockActiveCount,
    inactiveCount: mockInActiveCount,
  };
}

// Temp function until real dat used
function retrieveMockData(
  createdAtQuery: string | Date | Prisma.DateTimeFilter<'Order'> | undefined
) {
  const mockActiveCount = data.trips.filter((trip) => {
    return trip.isAvailableForPurchase === true;
  }).length;

  const mockInActiveCount = data.trips.filter((trip) => {
    return trip.isAvailableForPurchase === false;
  }).length;

  const mockChartData = data.trips
    // .filter((trip) => {
    //   return trip.createdAt === createdAtQuery;
    // })
    .map((trip) => {
      const orders = data.orders
        .filter((order) => {
          return order.tripId === trip.id;
        })
        .map((order) => ({ pricePaidInBaht: order.pricePaidInBaht }));

      return {
        name: trip.name,
        orders: orders,
      };
    });

  return {
    mockActiveCount,
    mockInActiveCount,
    mockChartData,
  };
}
