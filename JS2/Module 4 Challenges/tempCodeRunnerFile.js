const getWeather = async function(location, info) {
    const url = "http://localhost:3000/weather";
    const maxWindSpeed = 15;
    const minTemp = -20;

    // Ensure cities is always an array
    const cities = Array.isArray(location) ? location : [location];

    // Helper: display wind info
    const showWindInfo = (cityName, wind) => {
        if (!wind) return;
        console.log(`WIND: ${wind.speed} m/s, ${wind.deg} deg`);
        if (wind.speed > maxWindSpeed) {
            console.log(`WARNING! Wind in ${cityName} over ${maxWindSpeed} m/s`);
        }
    };

    // Helper: display other info
    const showInfo = (cityName, type, value) => {
        if (value === undefined) return;
        const unit = type === 'temp' ? 'C' : '%';
        console.log(`${type.toUpperCase()}: ${value} ${unit}`);
        if (type === 'temp' && value < minTemp) {
            console.log(`WARNING! Temperature in ${cityName} below ${minTemp}C`);
        }
    };

    try {
        // Fetch all cities in parallel
        const promises = cities.map(city => {
            const query = info && info !== 'all' ? `&info=${info}` : '';
            return fetch(`${url}?city=${city}${query}`);
        });

        const responses = await Promise.all(promises);
        const data = await Promise.all(responses.map(res => res.json()));

        // Display weather for each city
        for (const cityData of data) {
            console.log(`\nCITY: ${cityData.city}`);
            const weather = cityData.weather;

            if (!weather) {
                console.log("Weather unknown");
                continue;
            }

            if (info && info !== 'all') {
                // Display only requested info
                if (info === 'wind') showWindInfo(cityData.city, weather.wind);
                else showInfo(cityData.city, info, weather[info]);
            } else {
                // Display all weather info
                for (const key in weather) {
                    if (key === 'wind') showWindInfo(cityData.city, weather.wind);
                    else showInfo(cityData.city, key, weather[key]);
                }
            }
        }
    } catch (error) {
        console.log("Error fetching weather:", error.message);
    }
};