
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
  const location = useLocation();
  
  return (
    <div 
      key={location.pathname}
      className={`animate-fade-in ${className}`}
    >
      {children}
    </div>
  );
};
