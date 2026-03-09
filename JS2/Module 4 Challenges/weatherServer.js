// weatherServer.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

// Weather database
const weather = [
    { city: "Oslo", weather: { wind: { speed: 8, deg: 170 }, clouds: 0, temp: 0, precipitation: 0 } },
    { city: "Edinburgh", weather: { wind: { speed: 4, deg: 85 }, clouds: 60, temp: 3, precipitation: 0 } },
    { city: "Berlin", weather: { wind: { speed: 16, deg: 117 }, clouds: 70, temp: 2, precipitation: 30 } },
    { city: "Amsterdam", weather: { wind: { speed: 7, deg: 160 }, clouds: 80, temp: 5, precipitation: 10 } },
    { city: "Yakutsk", weather: { wind: { speed: 0, deg: 0 }, clouds: 0, temp: -40, precipitation: 0 } }
];

// Weather endpoint
app.get("/weather", (req, res) => {
    const cityData = weather.find(e => e.city === req.query.city);
    if (!cityData) {
        return res.json({ city: req.query.city });
    }

    if (!req.query.info || !Object.keys(cityData.weather).includes(req.query.info)) {
        return res.json(cityData);
    }

    res.json({
        city: cityData.city,
        weather: { [req.query.info]: cityData.weather[req.query.info] }
    });
});

// Start server and then fetch weather
app.listen(3000, () => {
    console.log("Server running on port 3000");

    // Call getWeather after server is ready
    getWeather(["Oslo", "Berlin", "Yakutsk"], "all");
});

// ---------------- getWeather function ----------------
function getWeather(location, info) {
    const url = "http://localhost:3000/weather";
    const maxWindSpeed = 15;
    const minTemp = -20;
    const cities = Array.isArray(location) ? location : [location];

    const showWindInfo = (cityName, wind) => {
        if (!wind) return;
        console.log(`WIND: ${wind.speed} m/s, ${wind.deg} deg`);
        if (wind.speed > maxWindSpeed) {
            console.log(`WARNING! Wind in ${cityName} over ${maxWindSpeed} m/s`);
        }
    };

    const showInfo = (cityName, type, value) => {
        if (value === undefined) return;
        const unit = type === 'temp' ? 'C' : '%';
        console.log(`${type.toUpperCase()}: ${value} ${unit}`);
        if (type === 'temp' && value < minTemp) {
            console.log(`WARNING! Temperature in ${cityName} below ${minTemp}C`);
        }
    };

    // Make requests sequentially to avoid fetch errors
    const promises = cities.map(city => {
        const query = info && info !== 'all' ? `&info=${info}` : '';
        return fetch(`${url}?city=${city}${query}`).then(res => res.json());
    });

    Promise.all(promises)
        .then(results => {
            results.forEach(cityData => {
                console.log(`\nCITY: ${cityData.city}`);
                const w = cityData.weather;
                if (!w) return console.log("No weather data available.");

                if (info && info !== 'all') {
                    if (info === 'wind') showWindInfo(cityData.city, w.wind);
                    else showInfo(cityData.city, info, w[info]);
                } else {
                    for (let key in w) {
                        if (key === 'wind') showWindInfo(cityData.city, w.wind);
                        else showInfo(cityData.city, key, w[key]);
                    }
                }
            });
        })
        .catch(e => console.log("Error fetching weather:", e.message));
}