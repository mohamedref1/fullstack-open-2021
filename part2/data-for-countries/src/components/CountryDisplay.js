import React from "react";

const CountryDisplay = ({name, capital, population, flag, languages, temp, windSpeed, windDeg}) => {
    return (
        <div>
            <div>
                <h2>{name}</h2>
                <p>capital {capital}</p>
                <p>population {population}</p>
                <h2>Spoken Languages</h2>
                <ul>
                    {languages.map((lang, idx) => 
                        <li key={idx}>{lang.name}</li>)}
                </ul>
                <img src={flag} 
                    alt={`${name} flag`}
                    width="150"
                    heigh="150" />
            </div>
            <div>
                <h2>Weather in {capital} </h2>
                <p><b>temperature: </b> {temp} Celcius</p>
                <p><b>wind: </b> {windSpeed} mph direction {windDeg}</p>
            </div>
        </div>
       )
}

export default CountryDisplay