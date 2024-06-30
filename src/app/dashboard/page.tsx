import { Nav, NavLink } from '@/components/nav';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { DashboardCard, DashboardSkeleton } from './_components/DashboardCard';
import { getTripData } from './_helpers/helper';
import { RANGE_OPTIONS, getRangeOption } from '@/lib/rangeOptions';
import { formatNumber } from '@/lib/formatter';
import { ChartCard } from './_components/ChartCard';
import { RevenueByTripChart } from './_components/charts/RevenueByTrip';

// will result in routes being rendered for each user at request time
export const dynamic = 'force-dynamic';

export default async function AdminDashboard({
  searchParams: {
    revenueByTripRange,
    revenueByTripRangeFrom,
    revenueByTripRangeTo,
  },
}: {
  searchParams: {
    revenueByTripRange?: string;
    revenueByTripRangeFrom?: string;
    revenueByTripRangeTo?: string;
  };
}) {
  const revenueByTripRangeOption =
    getRangeOption(
      revenueByTripRange,
      revenueByTripRangeFrom,
      revenueByTripRangeTo
    ) || RANGE_OPTIONS.all_time;

  const tripData = await getTripData(
    revenueByTripRangeOption.startDate,
    revenueByTripRangeOption.endDate
  );

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardCard
            title='Active trips'
            subtitle={`${formatNumber(tripData.inactiveCount)} Inactive`}
            body={formatNumber(tripData.activeCount)}
          />
        </Suspense>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8'>
        <ChartCard
          title='Revenue By Trip'
          queryKey='revenueByTripRange'
          selectedRangeLabel={revenueByTripRangeOption.label}
        >
          <RevenueByTripChart data={tripData.chartData} />
        </ChartCard>
        <ChartCard
          title='Revenue By Trip'
          queryKey='revenueByTripRange'
          selectedRangeLabel={revenueByTripRangeOption.label}
        >
          <RevenueByTripChart data={tripData.chartData} type='bar' />
        </ChartCard>
      </div>
    </main>
  );
}
