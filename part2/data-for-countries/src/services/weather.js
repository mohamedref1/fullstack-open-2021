import axios from "axios";

const baseURL = "http://api.openweathermap.org/data/2.5/weather"

const get = (cityName) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const url = `${baseURL}?q=${cityName}&appid=${API_KEY}&units=metric`

    return axios
        .get(url)
        .then(response => response.data)
        .then(weather => ({
                temp: weather.main.temp,
                windSpeed: weather.wind.speed,
                windDeg: weather.wind.deg
            }))
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {get}