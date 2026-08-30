import "./WeatherApp.css"
import { useState, useEffect } from "react";
import WeatherForm from "./WeatherForm";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherApp = () => {
    const [query, setQuery] = useState("Philippines")
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!query.trim()) return
        const fetchApi = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`)
                if (!res.ok) throw new Error("FAILED TO FIND PLACE")
                const data = await res.json()
                setResult(data)
            } catch (e) {
                console.error("API failed to fetch", e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchApi()
    }, [query])

    const placeHandler = (str) => {
        setQuery(str)
    }

    return (
        <div className="weatherContainer">
            <WeatherForm placeHandler={placeHandler} />
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && (
                <div className="weatherCard">
                    <h1 className="placeName">{result?.name}</h1>
                    <h2>{result?.sys?.country}</h2>
                    <h3>{`${result?.weather?.[0]?.main} - ${result?.weather?.[0]?.description}`}</h3>
                </div>
            )}
        </div>
    )
}

export default WeatherApp