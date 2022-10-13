import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function WeatherForm() {
    const { addWeather } = useContext(DataContext)

    function handleSubmit(event) {
        event.preventDefault()
        console.log(event.target)
        const formData = new FormData(event.target)
        const city = formData.get('city')
        addWeather(city)
        event.target.reset()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="city">Make sure the weather is not terrible. Search a City</label>
                <input type="text" className="form-control" name="city" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}