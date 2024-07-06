'use client';

import { formatCurrency, formatNumber } from '@/lib/formatter';
import ReactECharts from 'echarts-for-react';

type ChartType = 'pie' | 'bar';

const colors = [
  '#5470C6',
  '#91CC75',
  '#EE6666',
  '#73C0DE',
  '#3BA272',
  '#FC8452',
  '#9A60B4',
  '#EA7CCC',
];

type RevenueBytripChartProps = {
  data: {
    name: string;
    revenue: number;
    createdAt?: string;
  }[];
  type?: ChartType;
};

export function RevenueByTripChart({
  data,
  type = 'pie',
}: RevenueBytripChartProps) {
  const options = {
    title: {
      text: 'Trip Revenue Chart',
      subtext: 'MOCK Data until live',
      left: 'center',
      textStyle: {
        fontSize: 24,
        textShadowOffsetX: true,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) =>
        `${params.name}: ${formatCurrency(params.value)}`,
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: data.map((item) => item.name),
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Radius Mode',
        type: 'pie',
        radius: [20, 100],
        center: ['25%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        data: data.map((item, index) => ({
          value: item.revenue,
          name: item.name,
          itemStyle: {
            color: colors[index % colors.length],
          },
        })),
      },
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 80],
        center: ['75%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5,
        },
        data: data.map((item, index) => ({
          value: item.revenue,
          name: item.name,
          itemStyle: {
            color: colors[index % colors.length],
          },
        })),
      },
    ],
  };

  const lineOptions = {
    title: {
      text: 'Trip Revenue Bar Chart',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params: any) => {
        const { value } = params[0];
        return `${params[0].name}: ${formatCurrency(value)}`;
      },
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.name),
      axisLine: {
        lineStyle: {
          color: 'hsl(var(--primary))',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => formatCurrency(value),
      },
      axisLine: {
        lineStyle: {
          color: 'hsl(var(--primary))',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    series: [
      {
        name: 'Trips',
        type: 'bar',
        data: data.map((item, index) => ({
          value: item.revenue,
          itemStyle: {
            color: colors[index % colors.length],
          },
        })),
      },
    ],
  };

  return (
    <div>
      <ReactECharts
        option={type === 'pie' ? options : lineOptions}
        style={{ width: '100%', minHeight: 300 }}
      />
    </div>
  );
}
