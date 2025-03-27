
// Mock data for the weather app
// In a real application, these would be API calls to Kafka and MongoDB

// Current weather data (simulating Kafka real-time feed)
export const fetchCurrentWeather = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        location: "San Francisco",
        temperature: 22,
        feelsLike: 20,
        humidity: 65,
        windSpeed: 12,
        pressure: 1012,
        visibility: 8,
        uvIndex: 5,
        condition: "Partly Cloudy",
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

// Real-time streaming data for Dashboard (simulating Kafka)
export const fetchRealtimeData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        temperature: {
          current: 22,
          min: 17,
          max: 26
        },
        precipitation: {
          probability: 20,
          intensity: 0.5
        },
        wind: {
          speed: 12,
          direction: "NW",
          gust: 18
        },
        sensors: [
          { id: "sensor-1", value: 22.5, type: "temperature", location: "Downtown" },
          { id: "sensor-2", value: 23.1, type: "temperature", location: "Airport" },
          { id: "sensor-3", value: 21.8, type: "temperature", location: "Bay Area" },
          { id: "sensor-4", value: 21.2, type: "temperature", location: "Golden Gate" }
        ],
        alerts: [
          { id: 1, type: "info", message: "Light rain expected in 2 hours", time: "13:45" },
          { id: 2, type: "warning", message: "Wind gusts increasing to 30km/h", time: "15:20" }
        ]
      });
    }, 800);
  });
};

// Historical weather data (simulating MongoDB)
export const fetchHistoricalData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        daily: [
          { date: "Mon", temperature: 19, precipitation: 0, summary: "Clear" },
          { date: "Tue", temperature: 21, precipitation: 0, summary: "Clear" },
          { date: "Wed", temperature: 22, precipitation: 2, summary: "Partly Cloudy" },
          { date: "Thu", temperature: 20, precipitation: 8, summary: "Rain" },
          { date: "Fri", temperature: 18, precipitation: 12, summary: "Heavy Rain" },
          { date: "Sat", temperature: 19, precipitation: 3, summary: "Light Rain" },
          { date: "Sun", temperature: 22, precipitation: 0, summary: "Clear" }
        ],
        monthly: [
          { month: "Jan", avgTemp: 14, maxTemp: 19, minTemp: 9 },
          { month: "Feb", avgTemp: 15, maxTemp: 20, minTemp: 10 },
          { month: "Mar", avgTemp: 17, maxTemp: 22, minTemp: 12 },
          { month: "Apr", avgTemp: 19, maxTemp: 25, minTemp: 14 },
          { month: "May", avgTemp: 21, maxTemp: 27, minTemp: 16 }
        ],
        yesterday: {
          temperature: {
            morning: 18,
            afternoon: 22,
            evening: 20,
            night: 17
          },
          precipitation: 0,
          humidity: {
            morning: 75,
            afternoon: 60,
            evening: 65,
            night: 80
          },
          summary: "Clear throughout the day"
        },
        forecast: [
          { date: "Tomorrow", high: 23, low: 16, precipitation: 10, summary: "Mostly Clear" },
          { date: "Day 2", high: 24, low: 17, precipitation: 5, summary: "Sunny" },
          { date: "Day 3", high: 21, low: 15, precipitation: 40, summary: "Chance of Rain" },
          { date: "Day 4", high: 19, low: 14, precipitation: 60, summary: "Rain" },
          { date: "Day 5", high: 20, low: 15, precipitation: 20, summary: "Partly Cloudy" }
        ]
      });
    }, 1000);
  });
};
