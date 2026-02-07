'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface SalesData {
  date: string
  total: number
}

interface SalesChartProps {
  data: SalesData[]
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="w-full h-[350px] bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ventas últimos 7 días</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#6B7280' }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6B7280' }} 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value: number | undefined) => [`$${Number(value || 0).toFixed(2)}`, 'Ventas']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Bar 
            dataKey="total" 
            name="Total Ventas" 
            fill="#6366f1" 
            radius={[4, 4, 0, 0]} 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
