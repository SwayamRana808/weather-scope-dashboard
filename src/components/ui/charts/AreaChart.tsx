
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

interface AreaChartProps {
  data: any[];
  xKey: string;
  yKeys: { key: string; color: string; name: string }[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  showAxis?: boolean;
}

export const AreaChart = ({
  data,
  xKey,
  yKeys,
  height = 300,
  className = "",
  showGrid = true,
  showAxis = true
}: AreaChartProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="rgba(0,0,0,0.06)" 
            />
          )}
          {showAxis && (
            <>
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
            </>
          )}
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none',
              padding: '10px'
            }} 
          />
          {yKeys.map((yKey, index) => (
            <Area
              key={yKey.key}
              type="monotone"
              dataKey={yKey.key}
              name={yKey.name}
              stroke={yKey.color}
              fillOpacity={0.2}
              fill={yKey.color}
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};
