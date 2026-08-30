import { useState } from "react"

const WeatherForm = ({ placeHandler }) => {
    const [place, setPlace] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        placeHandler(place)
        setPlace("")
    }

    const formHandler = (e) => {
        setPlace(e.target.value)
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="text"
                value={place}
                name={place}
                onChange={formHandler}
                placeholder="Enter a place"
            />
        </form>
    )
}

export default WeatherForm