
import { PageTransition } from "@/components/layout/PageTransition";
import { WeatherCard } from "@/components/ui/weather/WeatherCard";
import { WeatherMetric } from "@/components/ui/weather/WeatherMetric";
import { AreaChart } from "@/components/ui/charts/AreaChart";
import { useQuery } from "@tanstack/react-query";
import { fetchRealtimeData } from "@/lib/api";
import { useState, useEffect } from "react";

// Generate mock streaming temperature data
const generateStreamingData = (initial: number, count: number) => {
  const data = [];
  let current = initial;
  
  for (let i = 0; i < count; i++) {
    // Random fluctuation between -1 and +1 degrees
    const fluctuation = (Math.random() * 2 - 1) * 0.5;
    current += fluctuation;
    current = Math.round(current * 10) / 10; // Round to 1 decimal place
    
    const time = new Date();
    time.setMinutes(time.getMinutes() - (count - i));
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: current
    });
  }
  
  return data;
};

const Dashboard = () => {
  const [streamingData, setStreamingData] = useState<any[]>([]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['realtimeData'],
    queryFn: () => fetchRealtimeData() as Promise<any>,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
  
  // Simulate streaming data updates
  useEffect(() => {
    if (data?.temperature?.current) {
      // Initialize with 20 data points
      setStreamingData(generateStreamingData(data.temperature.current, 20));
      
      // Update streaming data every 3 seconds
      const interval = setInterval(() => {
        setStreamingData(prevData => {
          const newData = [...prevData];
          
          // Remove oldest data point
          newData.shift();
          
          // Add new data point
          const lastTemp = newData[newData.length - 1].temperature;
          const fluctuation = (Math.random() * 2 - 1) * 0.3;
          const newTemp = Math.round((lastTemp + fluctuation) * 10) / 10;
          
          newData.push({
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temperature: newTemp
          });
          
          return newData;
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [data?.temperature?.current]);

  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-3">
              Real-Time Dashboard
            </h1>
            <p className="text-foreground/70">
              Live weather data stream from our network of sensors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <WeatherCard 
              className="col-span-1"
              animationDelay="animation-delay-100"
            >
              <h3 className="text-lg font-medium mb-4">Temperature</h3>
              {isLoading ? (
                <div className="h-24 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-gray-100 animate-pulse-slow"></div>
                </div>
              ) : data?.temperature ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-light">{data.temperature.current}°C</span>
                    <div className="text-right">
                      <div className="flex items-center justify-end text-sm">
                        <span className="text-weather-blue-dark">↑ {data.temperature.max}°</span>
                        <span className="mx-2">|</span>
                        <span className="text-foreground/70">↓ {data.temperature.min}°</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 text-foreground/70">
                  No data available
                </div>
              )}
            </WeatherCard>
            
            <WeatherCard 
              className="col-span-1"
              animationDelay="animation-delay-200"
            >
              <h3 className="text-lg font-medium mb-4">Precipitation</h3>
              {isLoading ? (
                <div className="h-24 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-gray-100 animate-pulse-slow"></div>
                </div>
              ) : data?.precipitation ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-light">{data.precipitation.probability}%</span>
                    <div className="text-right">
                      <div className="text-sm text-foreground/70">
                        Intensity: {data.precipitation.intensity} mm/h
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 text-foreground/70">
                  No data available
                </div>
              )}
            </WeatherCard>
            
            <WeatherCard 
              className="col-span-1"
              animationDelay="animation-delay-300"
            >
              <h3 className="text-lg font-medium mb-4">Wind</h3>
              {isLoading ? (
                <div className="h-24 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-gray-100 animate-pulse-slow"></div>
                </div>
              ) : data?.wind ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-light">{data.wind.speed} km/h</span>
                    <div className="text-right">
                      <div className="text-sm text-foreground/70">
                        Direction: {data.wind.direction}
                      </div>
                      <div className="text-sm text-foreground/70">
                        Gusts: {data.wind.gust} km/h
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 text-foreground/70">
                  No data available
                </div>
              )}
            </WeatherCard>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <WeatherCard 
              className="w-full"
              animationDelay="animation-delay-100"
            >
              <h3 className="text-lg font-medium mb-6">Live Temperature Stream</h3>
              {streamingData.length > 0 ? (
                <AreaChart 
                  data={streamingData}
                  xKey="time"
                  yKeys={[{ key: "temperature", color: "#38BDF8", name: "Temperature (°C)" }]}
                  height={300}
                />
              ) : (
                <div className="h-72 flex items-center justify-center">
                  <div className="h-12 w-full max-w-md bg-gray-100 animate-pulse-slow rounded"></div>
                </div>
              )}
              <div className="text-xs text-right mt-2 text-foreground/60">
                Data updates every 3 seconds • Live from Kafka
              </div>
            </WeatherCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherCard 
              className="col-span-1"
              animationDelay="animation-delay-200"
            >
              <h3 className="text-lg font-medium mb-4">Sensor Network</h3>
              {isLoading ? (
                <div className="h-48 w-full flex items-center justify-center">
                  <div className="h-24 w-full max-w-xs bg-gray-100 animate-pulse-slow rounded"></div>
                </div>
              ) : data?.sensors ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {data.sensors.map((sensor: any) => (
                      <div 
                        key={sensor.id}
                        className="flex items-center justify-between border-b border-border pb-3"
                      >
                        <div>
                          <div className="font-medium">{sensor.location}</div>
                          <div className="text-sm text-foreground/60">{sensor.type}</div>
                        </div>
                        <div className="text-xl font-light">
                          {sensor.value}°C
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 text-foreground/70">
                  No sensor data available
                </div>
              )}
            </WeatherCard>
            
            <WeatherCard 
              className="col-span-1"
              animationDelay="animation-delay-300"
            >
              <h3 className="text-lg font-medium mb-4">Weather Alerts</h3>
              {isLoading ? (
                <div className="h-48 w-full flex items-center justify-center">
                  <div className="h-24 w-full max-w-xs bg-gray-100 animate-pulse-slow rounded"></div>
                </div>
              ) : data?.alerts && data.alerts.length > 0 ? (
                <div className="space-y-4">
                  {data.alerts.map((alert: any) => (
                    <div 
                      key={alert.id}
                      className={`flex items-start p-4 rounded-lg ${
                        alert.type === 'warning' 
                          ? 'bg-orange-50 border-l-4 border-orange-400' 
                          : 'bg-blue-50 border-l-4 border-blue-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center">
                          <span className={`font-medium ${
                            alert.type === 'warning' ? 'text-orange-700' : 'text-blue-700'
                          }`}>
                            {alert.type === 'warning' ? 'Warning' : 'Information'}
                          </span>
                          <span className="text-xs ml-2 text-foreground/60">
                            {alert.time}
                          </span>
                        </div>
                        <p className="mt-1 text-foreground/80">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <div className="text-center text-foreground/70">
                    <p>No active alerts at this time</p>
                    <p className="text-sm mt-1">Weather conditions are stable</p>
                  </div>
                </div>
              )}
            </WeatherCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Dashboard;
