
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface WeatherCardProps {
  children: ReactNode;
  className?: string;
  animationDelay?: string;
}

export const WeatherCard = ({ 
  children, 
  className = "",
  animationDelay = ""
}: WeatherCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden glass border border-white/20 animate-blur-in", 
        animationDelay,
        className
      )}
    >
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};
