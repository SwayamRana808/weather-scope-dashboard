
import { cn } from "@/lib/utils";

interface WeatherMetricProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

export const WeatherMetric = ({
  label,
  value,
  unit,
  icon,
  className = "",
  valueClassName = ""
}: WeatherMetricProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center text-foreground/60 mb-1 text-sm font-medium">
        {icon && <span className="mr-1.5">{icon}</span>}
        <span>{label}</span>
      </div>
      <div className={cn("font-semibold", valueClassName)}>
        {value}
        {unit && <span className="ml-1 text-foreground/70 font-normal text-sm">{unit}</span>}
      </div>
    </div>
  );
};
