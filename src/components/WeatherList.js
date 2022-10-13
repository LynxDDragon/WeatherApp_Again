import { useEffect, useState, useContext } from 'react';
import Weather from './Weather';
import { DataContext } from '../contexts/DataProvider';

export default function WeatherList() {
    const { weatherList } = useContext(DataContext)

    return (
        <div>
            { weatherList.map((weather) => <Weather weather={weather} preview={true} key={weather.city} />) }
        </div>
    )
}