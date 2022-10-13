import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Weather from '../components/Weather';
import { DataContext } from '../contexts/DataProvider';

export default function WeatherSingle() {
    const [weather, setWeather] = useState({})
    const { uid, city } = useParams()
    const { getWeather } = useContext(DataContext)

    useEffect(() => {
        getWeather(uid, city, setWeather)
    }, [])

    return (
        <div>
            <h1>Weather: {city}</h1>
            <Weather weather={weather} />
        </div>
    )
}