import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

export function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <Card className='overflow-hidden flex flex-col animate-pulse'>
      <div className='w-full aspect-video bg-gray-300' />
      <CardHeader>
        <div className='w-3/4 h-6 rounded-full bg-gray-300' />
        <CardTitle />
        <div className='w-1/2 h-4 rounded-full bg-gray-300' />
        <CardDescription />
      </CardHeader>
      <CardContent className='bg-gray-200' />
    </Card>
  );
}
