class WeatherDashboard {
  #cities;
  #weatherData;

  constructor() {
    this.#cities = new Set();
    this.#weatherData = new Map();
  }

  // Add a city to the set
  addCity(city) {
    this.#cities.add(city);
  }

  // Synchronize weather data for all cities
  async syncData(fetchFunction) {
    const promises = Array.from(this.#cities).map(async (city) => {
      try {
        const data = await fetchFunction(city);
        this.#weatherData.set(city, data.weather);
      } catch (error) {
        console.error(`Failed to fetch weather for ${city}:`, error.message);
      }
    });

    await Promise.all(promises);
  }

  // Get the city with the highest temperature
  getHottestCity() {
    if (this.#weatherData.size === 0) return null;

    let hottestCity = null;
    let highestTemp = -Infinity;

    for (const [city, weather] of this.#weatherData.entries()) {
      if (weather.temp > highestTemp) {
        highestTemp = weather.temp;
        hottestCity = city;
      }
    }

    return hottestCity;
  }
}

// ----- Test Code (Do not modify!) -----
const mockWeatherFetch = async (city) => {
  const delay = Math.floor(Math.random() * 500) + 100;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (city === 'Atlantis') reject(new Error('City not found'));
      const mockData = {
        Oslo: { temp: -5, wind: 12 },
        Manila: { temp: 32, wind: 5 },
        Tokyo: { temp: 15, wind: 8 }
      };
      resolve({ city: city, weather: mockData[city] || { temp: 20, wind: 2 } });
    }, delay);
  });
};

const dashboard = new WeatherDashboard();
dashboard.addCity('Oslo');
dashboard.addCity('Manila');
dashboard.addCity('Tokyo');
dashboard.addCity('Oslo');      // Duplicate, won't be added again
dashboard.addCity('Atlantis');  // Will trigger error handling

(async () => {
  console.log('Synchronizing data...');
  await dashboard.syncData(mockWeatherFetch);
  console.log('Hottest city is:', dashboard.getHottestCity());
})();