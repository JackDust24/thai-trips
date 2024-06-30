import { formatDate } from '@/lib/formatter';

export const mockSalesData = {
  chartData: [
    {
      date: formatDate(new Date(Date.now())),
      totalSales: 78,
    },
    {
      date: formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24)),
      totalSales: 175,
    },
    {
      date: formatDate(new Date(Date.now() - 2000 * 60 * 60 * 24)),
      totalSales: 46,
    },
  ],
  amount: 299,
  numberOfSales: 3,
};

export const mockTripData = {
  chartData: [
    {
      name: 'Hawk t-shirt',
      revenue: 30,
    },
    {
      name: 'Hawk gun',
      revenue: 40,
    },
    {
      name: 'Hawk sofa',
      revenue: 60,
    },
  ],
  activeCount: 2,
  inactiveCount: 1,
};

export const mockUserData = {
  chartData: [
    {
      date: formatDate(new Date(Date.now())),
      totalUsers: 11,
    },
    {
      date: formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24)),
      totalUsers: 16,
    },
    {
      date: formatDate(new Date(Date.now() - 2000 * 60 * 60 * 24)),
      totalUsers: 8,
    },
  ],
  userCount: 19,
  averageValuePerUser: 243,
};
