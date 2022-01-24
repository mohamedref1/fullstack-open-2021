import React from "react";

const CountriesList = ({countries, onClick}) => {
    return (
        <div>
            {countries.map(country => 
                <div key={country.name}>
                    <span>{country.name}</span>
                    <button onClick={onClick} value={country.name}>show</button>
                </div>)}
        </div>   
    )
}

export default CountriesList