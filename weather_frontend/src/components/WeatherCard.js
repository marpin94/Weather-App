import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { WeatherImg } from './WeatherImg';



export const WeatherCard = ({temp, city, description, state, country,}) => {

    const [faren, setFaren] = useState(false)
    const [weatherKey, setWeatherKey] = useState('')
    
    var temp_f = Math.round((temp * 9/5) +32);
    

    let weatherImgObj = {
        clouds: 'CLOUDY',
        clear: 'CLEAR_DAY',
        snow: 'SNOW',
        rain: 'RAIN'
    }

    const renderWeatherImg = () => {
        if(description) {
            setWeatherKey('')
            const keys = Object.keys(weatherImgObj)
            const values = Object.values(weatherImgObj)
            const lower = description.toLowerCase()
            for (let i = 0; i < keys.length; i++){
                if(lower.includes(keys[i])){
                   setWeatherKey(values[i])                  
                }
            }
        }
    }


   useEffect(() => {
        renderWeatherImg();
      
   })

    const handleClick = (e) => {
        e.preventDefault()
        setFaren(!faren)
    }

    return (
        <>
        <div className=' shadow card text-center text-primary border border-dark'>

        <div className = 'card-img d-flex align-self-start mr-3'> {weatherKey && <WeatherImg icon={weatherKey}/>}  </div>
            
            <div className='card-img-overlay'>
                {city && <h2>{city}{country =='US'? `,${state}`:''}</h2>} 
                  
            </div>

            <div className='card-text'>
                {country && country=='US'? '':<h2 className='card-header'>{country}</h2>}
                {temp && <h4>Temperature: {faren? `${temp_f} F`:`${temp} C`}</h4>}
                {description && <p> {description} </p>}
               
            </div>


            
        </div>
        <button type="button" className="btn btn-secondary d-flex align-self-end" onClick={handleClick} > Toggle C/F </button> 
        </>
    )
}