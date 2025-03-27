
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  height?: number;
  className?: string;
  barColors?: string[];
}

export const BarChart = ({
  data,
  xKey,
  yKey,
  height = 300,
  className = "",
  barColors = ["#38BDF8"]
}: BarChartProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          barCategoryGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
          <XAxis 
            dataKey={xKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.5)' }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.5)' }}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none',
              padding: '10px'
            }} 
          />
          <Bar 
            dataKey={yKey} 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-in-out"
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={barColors[index % barColors.length]} 
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
