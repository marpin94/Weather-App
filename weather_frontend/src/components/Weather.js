import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {WeatherCard}  from './WeatherCard'

export const Weather = () => {
    const [city, setCity] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [load,setLoad] = useState(false)



    async function handleClick(e) {
        e.preventDefault()
        if (city ==='') {
            alert('Please enter a city name')
        } else{
        await axios.get(`/getWeather/${city}`, {timeout:1000}).then(response =>{
            const apiData = (response.data.data[0])
            const status = (response.status)

            if(status == 200) {
                setSearchResults({
                    // data:apiData.data[0],
                    temp:apiData.temp,
                    city:apiData.city_name,
                    description: apiData.weather.description,
                    state: apiData.state_code,
                    country: apiData.country_code               
                })

                setLoad(true)
                setCity('')
                console.log(process.env.API_KEY)
        } 
    })
    .catch(err => {
        console.log(err.code)
        return(
            alert('City not found, Please try again')
        )
    })
    }
    }

    return (
        <div>
            <form className='form-group'>
                <input className='form-control form-control-lg'type='text' placeholder='Enter City Name...' value={city} onChange={(e)=>setCity(e.target.value) } />
                <button className='btn btn-primary btn-block'onClick = {handleClick}>Search</button> 
            </form>
            <div className=''>
            {load && <WeatherCard
            temp={searchResults.temp} 
            city={searchResults.city} 
            description={searchResults.description}
            state = {searchResults.state} 
            country = {searchResults.country} /> }
        </div>
        </div>
    )
}
