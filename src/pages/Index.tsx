
import { PageTransition } from "@/components/layout/PageTransition";
import { WeatherCard } from "@/components/ui/weather/WeatherCard";
import { WeatherMetric } from "@/components/ui/weather/WeatherMetric";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "@/lib/api";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: weather, isLoading } = useQuery({
    queryKey: ['currentWeather'],
    queryFn: () => fetchCurrentWeather() as Promise<any>,
  });

  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-foreground/90">
              Weather<span className="text-primary">Scope</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Real-time weather monitoring and advanced analytics with precision forecasting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 mb-12">
            <WeatherCard 
              className="max-w-3xl mx-auto w-full"
              animationDelay="animation-delay-100"
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="h-24 w-24 rounded-full bg-gray-100 animate-pulse-slow"></div>
                  <div className="h-8 w-48 mt-4 bg-gray-100 rounded animate-pulse-slow"></div>
                  <div className="h-4 w-24 mt-2 bg-gray-100 rounded animate-pulse-slow"></div>
                </div>
              ) : weather ? (
                <div className="p-2">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                      <h2 className="text-xl font-medium text-foreground/80 mb-2">
                        {weather.location}
                      </h2>
                      <div className="flex flex-col">
                        <span className="text-6xl font-light text-foreground/90">
                          {weather.temperature}°C
                        </span>
                        <span className="text-foreground/60 mt-1">
                          Feels like {weather.feelsLike}°C
                        </span>
                      </div>
                      <p className="text-foreground/70 mt-2">{weather.condition}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <WeatherMetric 
                        label="Humidity" 
                        value={weather.humidity} 
                        unit="%" 
                      />
                      <WeatherMetric 
                        label="Wind Speed" 
                        value={weather.windSpeed} 
                        unit="km/h" 
                      />
                      <WeatherMetric 
                        label="Pressure" 
                        value={weather.pressure} 
                        unit="hPa" 
                      />
                      <WeatherMetric 
                        label="Visibility" 
                        value={weather.visibility} 
                        unit="km" 
                      />
                      <WeatherMetric 
                        label="UV Index" 
                        value={weather.uvIndex} 
                      />
                      <WeatherMetric 
                        label="Updated" 
                        value={new Date(weather.timestamp).toLocaleTimeString()} 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 text-foreground/70">
                  Unable to load weather data
                </div>
              )}
            </WeatherCard>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in animation-delay-300">
            <Link to="/dashboard">
              <Button 
                className="min-w-40 py-6"
              >
                View Dashboard
              </Button>
            </Link>
            <Link to="/analytics">
              <Button 
                variant="outline" 
                className="min-w-40 py-6"
              >
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
