
import { PageTransition } from "@/components/layout/PageTransition";
import { WeatherCard } from "@/components/ui/weather/WeatherCard";
import { WeatherMetric } from "@/components/ui/weather/WeatherMetric";
import { AreaChart } from "@/components/ui/charts/AreaChart";
import { BarChart } from "@/components/ui/charts/BarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { fetchHistoricalData } from "@/lib/api";

const Analytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['historicalData'],
    queryFn: () => fetchHistoricalData() as Promise<any>,
  });

  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-3">
              Weather Analytics
            </h1>
            <p className="text-foreground/70">
              Historical data and predictions from our MongoDB database
            </p>
          </div>
          
          <Tabs defaultValue="daily" className="w-full mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="animate-fade-in">
              <WeatherCard>
                <h3 className="text-lg font-medium mb-6">Last 7 Days Temperature</h3>
                {isLoading || !data?.daily ? (
                  <div className="h-72 flex items-center justify-center">
                    <div className="h-12 w-full max-w-md bg-gray-100 animate-pulse-slow rounded"></div>
                  </div>
                ) : (
                  <BarChart 
                    data={data.daily}
                    xKey="date"
                    yKey="temperature"
                    height={300}
                    barColors={data.daily.map(() => "#38BDF8")}
                  />
                )}
              </WeatherCard>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <WeatherCard 
                  className="col-span-1"
                  animationDelay="animation-delay-200"
                >
                  <h3 className="text-lg font-medium mb-6">Precipitation (mm)</h3>
                  {isLoading || !data?.daily ? (
                    <div className="h-52 flex items-center justify-center">
                      <div className="h-12 w-full max-w-xs bg-gray-100 animate-pulse-slow rounded"></div>
                    </div>
                  ) : (
                    <BarChart 
                      data={data.daily}
                      xKey="date"
                      yKey="precipitation"
                      height={200}
                      barColors={data.daily.map(() => "#0369A1")}
                    />
                  )}
                </WeatherCard>
                
                <WeatherCard 
                  className="col-span-1"
                  animationDelay="animation-delay-300"
                >
                  <h3 className="text-lg font-medium mb-4">Daily Summary</h3>
                  {isLoading || !data?.daily ? (
                    <div className="h-52 flex items-center justify-center">
                      <div className="h-12 w-full max-w-xs bg-gray-100 animate-pulse-slow rounded"></div>
                    </div>
                  ) : (
                    <div className="space-y-3 mt-2">
                      {data.daily.map((day: any) => (
                        <div 
                          key={day.date}
                          className="flex items-center justify-between border-b border-border pb-2"
                        >
                          <div className="font-medium">{day.date}</div>
                          <div className="flex items-center space-x-6">
                            <div className="text-foreground/80">{day.temperature}°C</div>
                            <div className="text-foreground/70 w-24 text-right">{day.summary}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </WeatherCard>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="animate-fade-in">
              <WeatherCard>
                <h3 className="text-lg font-medium mb-6">5-Month Temperature Trends</h3>
                {isLoading || !data?.monthly ? (
                  <div className="h-72 flex items-center justify-center">
                    <div className="h-12 w-full max-w-md bg-gray-100 animate-pulse-slow rounded"></div>
                  </div>
                ) : (
                  <AreaChart 
                    data={data.monthly}
                    xKey="month"
                    yKeys={[
                      { key: "maxTemp", color: "#F59E0B", name: "Max Temperature" },
                      { key: "avgTemp", color: "#38BDF8", name: "Avg Temperature" },
                      { key: "minTemp", color: "#0369A1", name: "Min Temperature" }
                    ]}
                    height={300}
                  />
                )}
              </WeatherCard>
            </TabsContent>
            
            <TabsContent value="yesterday" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WeatherCard className="col-span-1">
                  <h3 className="text-lg font-medium mb-6">Yesterday's Temperature</h3>
                  {isLoading || !data?.yesterday ? (
                    <div className="h-72 flex items-center justify-center">
                      <div className="h-12 w-full max-w-xs bg-gray-100 animate-pulse-slow rounded"></div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground/60 mb-1">Morning</span>
                          <span className="text-2xl font-light">{data.yesterday.temperature.morning}°</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground/60 mb-1">Afternoon</span>
                          <span className="text-2xl font-light">{data.yesterday.temperature.afternoon}°</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground/60 mb-1">Evening</span>
                          <span className="text-2xl font-light">{data.yesterday.temperature.evening}°</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground/60 mb-1">Night</span>
                          <span className="text-2xl font-light">{data.yesterday.temperature.night}°</span>
                        </div>
                      </div>
                      
                      <div className="text-center pt-4 border-t border-border">
                        <div className="text-foreground/70">{data.yesterday.summary}</div>
                        <div className="text-sm text-foreground/60 mt-1">
                          Precipitation: {data.yesterday.precipitation} mm
                        </div>
                      </div>
                    </div>
                  )}
                </WeatherCard>
                
                <WeatherCard className="col-span-1">
                  <h3 className="text-lg font-medium mb-6">Yesterday's Humidity</h3>
                  {isLoading || !data?.yesterday ? (
                    <div className="h-72 flex items-center justify-center">
                      <div className="h-12 w-full max-w-xs bg-gray-100 animate-pulse-slow rounded"></div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground/60 mb-1">Morning</span>
                          <span className="text-2xl font-light">{data.yesterday.humidity.morning}%</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground/60 mb-1">Afternoon</span>
                          <span className="text-2xl font-light">{data.yesterday.humidity.afternoon}%</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground/60 mb-1">Evening</span>
                          <span className="text-2xl font-light">{data.yesterday.humidity.evening}%</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground/60 mb-1">Night</span>
                          <span className="text-2xl font-light">{data.yesterday.humidity.night}%</span>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-4 border-t border-border">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-sm text-foreground/60 mb-1">Average</div>
                            <div className="text-xl font-light">
                              {Math.round((
                                data.yesterday.humidity.morning + 
                                data.yesterday.humidity.afternoon + 
                                data.yesterday.humidity.evening + 
                                data.yesterday.humidity.night
                              ) / 4)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-foreground/60 mb-1">Range</div>
                            <div className="text-xl font-light">
                              {Math.min(
                                data.yesterday.humidity.morning,
                                data.yesterday.humidity.afternoon,
                                data.yesterday.humidity.evening,
                                data.yesterday.humidity.night
                              )}% - {Math.max(
                                data.yesterday.humidity.morning,
                                data.yesterday.humidity.afternoon,
                                data.yesterday.humidity.evening,
                                data.yesterday.humidity.night
                              )}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </WeatherCard>
              </div>
            </TabsContent>
            
            <TabsContent value="forecast" className="animate-fade-in">
              <WeatherCard>
                <h3 className="text-lg font-medium mb-6">5-Day Forecast</h3>
                {isLoading || !data?.forecast ? (
                  <div className="h-72 flex items-center justify-center">
                    <div className="h-12 w-full max-w-md bg-gray-100 animate-pulse-slow rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {data.forecast.map((day: any, index: number) => (
                      <div 
                        key={day.date}
                        className={`p-4 rounded-lg ${index === 0 ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            {day.date}
                            {index === 0 && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                Next
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm mb-1">
                              <span className="text-foreground/80">High: {day.high}°</span>
                              <span className="mx-2 text-foreground/30">|</span>
                              <span className="text-foreground/60">Low: {day.low}°</span>
                            </div>
                            <div className="flex items-center justify-end">
                              <div className="text-sm text-foreground/70 mr-3">
                                {day.precipitation}% 
                              </div>
                              <div className="text-foreground/80">{day.summary}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-foreground/60">
                    <span>Based on historical patterns and current conditions</span>
                    <span>Data from MongoDB • Updated 2 hours ago</span>
                  </div>
                </div>
              </WeatherCard>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageTransition>
  );
};

export default Analytics;
