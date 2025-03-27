
// Mock data for the weather app
// In a real application, these would be API calls to Kafka and MongoDB

// Current weather data (simulating Kafka real-time feed)
export const fetchCurrentWeather = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        location: "San Francisco",
        temperature: 22,
        humidity: 65,
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
        humidity: 65,
        sensors: [
          { id: "sensor-1", value: 22.5, type: "temperature", location: "Downtown" },
          { id: "sensor-2", value: 23.1, type: "temperature", location: "Airport" },
          { id: "sensor-3", value: 21.8, type: "temperature", location: "Bay Area" },
          { id: "sensor-4", value: 21.2, type: "temperature", location: "Golden Gate" }
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
          { date: "Mon", temperature: 19, humidity: 62, summary: "Clear" },
          { date: "Tue", temperature: 21, humidity: 60, summary: "Clear" },
          { date: "Wed", temperature: 22, humidity: 65, summary: "Partly Cloudy" },
          { date: "Thu", temperature: 20, humidity: 70, summary: "Rain" },
          { date: "Fri", temperature: 18, humidity: 75, summary: "Heavy Rain" },
          { date: "Sat", temperature: 19, humidity: 68, summary: "Light Rain" },
          { date: "Sun", temperature: 22, humidity: 62, summary: "Clear" }
        ],
        monthly: [
          { month: "Jan", avgTemp: 14, avgHumidity: 72 },
          { month: "Feb", avgTemp: 15, avgHumidity: 70 },
          { month: "Mar", avgTemp: 17, avgHumidity: 68 },
          { month: "Apr", avgTemp: 19, avgHumidity: 65 },
          { month: "May", avgTemp: 21, avgHumidity: 62 }
        ],
        yesterday: {
          temperature: {
            morning: 18,
            afternoon: 22,
            evening: 20,
            night: 17
          },
          humidity: {
            morning: 75,
            afternoon: 60,
            evening: 65,
            night: 80
          },
          summary: "Clear throughout the day"
        },
        forecast: [
          { date: "Tomorrow", high: 23, low: 16, humidity: 60, summary: "Mostly Clear" },
          { date: "Day 2", high: 24, low: 17, humidity: 58, summary: "Sunny" },
          { date: "Day 3", high: 21, low: 15, humidity: 65, summary: "Chance of Rain" },
          { date: "Day 4", high: 19, low: 14, humidity: 75, summary: "Rain" },
          { date: "Day 5", high: 20, low: 15, humidity: 68, summary: "Partly Cloudy" }
        ]
      });
    }, 1000);
  });
};
